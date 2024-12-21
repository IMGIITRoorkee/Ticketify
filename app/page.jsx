"use client";

import React, { useState, useEffect } from "react";
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
    return { tickets: [] }; 
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [viewBy, setViewBy] = useState("category"); 

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data?.tickets || []); 
    };

    fetchTickets();
  }, []);

  const uniqueCategories = [...new Set(tickets?.map(({ category }) => category))];
  const uniqueStatuses = [...new Set(tickets?.map(({ status }) => status))];

  const handleViewByChange = (event) => {
    setViewBy(event.target.value);
  };

  const getUniqueGroups = () => {
    return viewBy === "category" ? uniqueCategories : uniqueStatuses;
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <label htmlFor="view-by" className="mr-2">
          View By:
        </label>
        <select
          id="view-by"
          value={viewBy}
          onChange={handleViewByChange}
          className="p-2 border rounded"
        >
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div>
        {getUniqueGroups().map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <h2>{group}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
              {tickets
                .filter((ticket) =>
                  viewBy === "category"
                    ? ticket.category === group
                    : ticket.status === group
                )
                .map((filteredTicket, ticketIndex) => (
                  <TicketCard
                    id={ticketIndex}
                    key={ticketIndex}
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