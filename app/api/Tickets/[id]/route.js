import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const ids = url.searchParams.get("ids");

    if (!ids) {
      return NextResponse.json(
        { message: "No ticket IDs provided" },
        { status: 400 }
      );
    }

    const idArray = ids.split(","); // Parse comma-separated IDs
    const foundTickets = await Ticket.find({ _id: { $in: idArray } });

    return NextResponse.json({ tickets: foundTickets }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { ids, updateData } = body;

    if (!ids || !ids.length) {
      return NextResponse.json(
        { message: "No ticket IDs provided" },
        { status: 400 }
      );
    }

    const tickets = await Ticket.find({ _id: { $in: ids } });

    // Validate and update tickets
    for (const ticket of tickets) {
      if (ticket.status !== "not started") {
        const { title, description, category, priority } = updateData;

        if (
          title !== ticket.title ||
          description !== ticket.description ||
          category !== ticket.category ||
          priority !== ticket.priority
        ) {
          return NextResponse.json(
            { message: "Cannot edit fields once the status is not 'not started'" },
            { status: 400 }
          );
        }
      }

      // Update ticket
      await Ticket.findByIdAndUpdate(ticket._id, { ...updateData });
    }

    return NextResponse.json({ message: "Tickets updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !ids.length) {
      return NextResponse.json(
        { message: "No ticket IDs provided" },
        { status: 400 }
      );
    }

    await Ticket.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: "Tickets deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
