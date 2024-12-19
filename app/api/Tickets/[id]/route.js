import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try{
      if(Ticket === null) {return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }
  const foundTicket = await Ticket.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
  }
  catch (err) {
    console.error("Error fetching tickets:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();
    const ticketData = body.formData;

    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
