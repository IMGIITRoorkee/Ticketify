import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tickets = await Ticket.find();
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

export async function PUT(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;
    const ticketId = req.url.split("/").pop(); 

    const existingTicket = await Ticket.findById(ticketId);

    if (existingTicket.status !== "not started") {
      const { title, description, category, priority } = ticketData;

      if (title !== existingTicket.title || description !== existingTicket.description || category !== existingTicket.category || priority !== existingTicket.priority) {
        return NextResponse.json(
          { message: "Cannot edit fields once the status is not 'not started'" },
          { status: 400 }
        );
      }
    }

    await Ticket.findByIdAndUpdate(ticketId, ticketData);

    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
