import Ticket from "@/app/models/Ticket";
import { createClient } from 'redis';
import { NextResponse } from "next/server";

export async function GET(req) {
  const cacheKey = "tickets";
  const redisClient = createClient();
  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();

  try {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get('page')) || 1; 
    const ticketsNo = parseInt(url.searchParams.get('ticketsNo')) || parseInt(process.env.TICKETS_NO) || 10; 

    const cacheKeyWithParams = `${cacheKey}-${page}-${ticketsNo}`;
    const cachedData = await redisClient.get(cacheKeyWithParams);

    if (cachedData) {
      console.log("Cache hit for tickets");
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log("Cache miss for tickets");

    const totalTickets = await Ticket.countDocuments();
    const totalPages = Math.ceil(totalTickets / ticketsNo);

    const tickets = await Ticket.find().skip((page - 1) * ticketsNo).limit(ticketsNo);

    const responseData = {
      hasNext: page < totalPages,
      totalPages,
      totalTickets,
      tickets,
    };

    await redisClient.set(cacheKeyWithParams, JSON.stringify(responseData), { EX: 3600 });

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    redisClient.disconnect();
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    if (ticketData.status === "not started") {
      await Ticket.create(ticketData);
      return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Cannot create ticket when status is not 'not started'" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}