import Ticket from "@/app/models/Ticket";
import { createClient } from 'redis';
import { NextResponse } from "next/server";

export async function GET() {
  const cacheKey = "tickets";
  const redisClient = createClient();
  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for tickets");
      return NextResponse.json({ tickets: JSON.parse(cachedData) });
    }

    console.log("Cache miss for tickets");
    const tickets = await Ticket.find();
    await redisClient.set(cacheKey, JSON.stringify(tickets), { EX: 3600 });
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
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


