// Add the "use client" directive at the top
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
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // Default filter for all statuses

  // Fetch tickets when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTickets();
      if (data?.tickets) {
        setTickets(data.tickets);
        setFilteredTickets(data.tickets); // Initially show all tickets
      }
    };

    fetchTickets();
  }, []);

  // Filter tickets based on selected status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTickets(tickets); // Show all tickets if 'all' is selected
    } else {
      setFilteredTickets(tickets.filter((ticket) => ticket.status === statusFilter));
    }
  }, [statusFilter, tickets]);

  // Handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Unique categories for grouping tickets
  const uniqueCategories = [...new Set(tickets?.map(({ category }) => category))];

  return (
    <div className="p-5">
      {/* Status filter UI */}
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Display tickets grouped by categories */}
      <div>
        {filteredTickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {filteredTickets
                .filter((ticket) => ticket.category === uniqueCategory)
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


