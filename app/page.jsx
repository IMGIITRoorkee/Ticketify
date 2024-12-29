"use client";

import React, { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard";
import NoTicketExistsCard from "./(components)/NoTicketExistsCard";

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
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewBy, setViewBy] = useState("category");
  const [groupVisibility, setGroupVisibility] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data?.tickets || []);
      setFilteredTickets(data?.tickets || []);
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) =>
          ticket.status.toLowerCase() === statusFilter.toLowerCase()
        )
      );
    }
  }, [statusFilter, tickets]);

  const uniqueCategories = [...new Set(filteredTickets?.map(({ category }) => category))];
  const uniqueStatuses = [...new Set(tickets?.map(({ status }) => status))];

  const handleViewByChange = (event) => {
    setViewBy(event.target.value);
    setGroupVisibility({});
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value.toLowerCase());
  };

  const getUniqueGroups = () => {
    return viewBy === "category" ? uniqueCategories : uniqueStatuses;
  };

  const toggleGroupVisibility = (group) => {
    setGroupVisibility((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
  };

  return (
    <div className="p-5">
      {tickets.length === 0 ? (
        <NoTicketExistsCard />
      ) : (
        <>
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

          <div className="mb-4">
            <label htmlFor="status-filter" className="mr-2">
              Filter by Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="started">Started</option>
              <option value="not started">Not Started</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            {getUniqueGroups().map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer bg-black-200 p-2 rounded"
                  onClick={() => toggleGroupVisibility(group)}
                >
                  <h2 className="font-bold">{group}</h2>
                  <span>
                    {groupVisibility[group] ? "▼" : "►"}
                  </span>
                </div>
                {groupVisibility[group] && (
                  <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                    {filteredTickets
                      .filter((ticket) =>
                        viewBy === "category"
                          ? ticket.category === group
                          : ticket.status === group
                      )
                      .sort((a, b) => b.priority - a.priority)
                      .map((filteredTicket, ticketIndex) => (
                        <TicketCard
                          id={ticketIndex}
                          key={ticketIndex}
                          ticket={filteredTicket}
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;