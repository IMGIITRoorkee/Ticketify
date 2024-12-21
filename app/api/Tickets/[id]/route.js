import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const foundTicket = await Ticket.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();
    const ticketData = body.formData;
    const ticketId = req.url.split("/").pop(); 
    const existingTicket = await Ticket.findById(ticketId);

    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    if (existingTicket.status !== "not started") {
      const { title, description, category, priority } = ticketData;

      if (title !== existingTicket.title || description !== existingTicket.description || category !== existingTicket.category || priority !== existingTicket.priority) {
        return NextResponse.json(
          { message: "Cannot edit fields once the status is not 'not started'" },
          { status: 400 }
        );
      }
    }

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
