import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get the URL from the request object
    const url = new URL(req.url);

    // Extract query parameters using URLSearchParams
    const page = url.searchParams.get('page') || 1; // Default page is 1
    const ticketsNo = url.searchParams.get('ticketsNo') || process.env.TICKETS_NO || 10; // Default tickets per page is 10 or as defined in env file

    // Get the total number of tickets (for calculating totalPages)
    const totalTickets = await Ticket.countDocuments();
    const totalPages = Math.ceil(totalTickets / ticketsNo);

    if (!url.searchParams.get('page') && !url.searchParams.get('ticketsNo')) {
      const tickets = await Ticket.find()
      return NextResponse.json({ tickets }, { status: 200 });
    }

    const tickets = await Ticket.find().skip((page - 1) * ticketsNo).limit(ticketsNo);
    return NextResponse.json({ hasNext: (page < totalPages), totalPages, totalTickets, tickets }, { status: 200 });
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


