import React from "react";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading tickets: ", error);
  }
};

const Dashboard = async () => {
  const data = await getTickets();

  const tickets = data.tickets;

  const uniqueStatuses = [
    ...new Set(tickets?.map(({ status }) => status)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueStatuses?.map((uniqueStatus, statusIndex) => (
            <div key={statusIndex} className="mb-4">
              <h2>{uniqueStatus}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.status === uniqueStatus) 
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

