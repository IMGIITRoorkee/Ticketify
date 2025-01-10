import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { id } = params;
  try {
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    const { id } = params;

    const body = await req.json();
    const ticketData = body.formData;
    const existingTicket = await Ticket.findById(id);

    if (existingTicket.status !== "not started") {
      const { title, description, category, priority } = ticketData;

      if (
        title !== existingTicket.title ||
        description !== existingTicket.description ||
        category !== existingTicket.category ||
        priority !== existingTicket.priority
      ) {
        return NextResponse.json(
          { message: "Cannot edit fields once the status is not 'not started'" },
          { status: 400 }
        );
      }
    }

    await Ticket.findByIdAndUpdate(id, { ...ticketData });
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
