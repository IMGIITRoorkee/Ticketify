"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TicketCard from "./(components)/TicketCard";
import NoTicketExistsCard from "./(components)/NoTicketExistsCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    console.error("Error loading tickets: ", error);
    return { tickets: [] };
  }
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewBy, setViewBy] = useState("category");
  const [isLoading, setIsLoading] = useState(true);
  const timeout = 5000;
  const [groupVisibility, setGroupVisibility] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    let ticketFetchTimeout;

    const fetchTicketsWithTimeout = async () => {
      if (!session) return;

      setIsLoading(true);

      try {
        const ticketsPromise = getTickets();
        ticketFetchTimeout = setTimeout(() => {
          setTickets([]);
          setFilteredTickets([]);
          setIsLoading(false);
        }, timeout);

        const data = await ticketsPromise;
        clearTimeout(ticketFetchTimeout);

        setTickets(data.tickets);  
        setFilteredTickets(data.tickets);  
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketsWithTimeout();

    return () => {
      if (ticketFetchTimeout) clearTimeout(ticketFetchTimeout);
    };
  }, [session, timeout]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-8 rounded-full border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent"></div>
        <p className="mt-4 text-lg font-medium text-dark-gray-700">
          Loading tickets, please wait...
        </p>
      </div>
    );
  }

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
            {getUniqueGroups().map((group, groupIndex) => {
              const groupTickets = filteredTickets.filter((ticket) =>
                viewBy === "category"
                  ? ticket.category === group
                  : ticket.status === group
              );

              return (
                <div key={groupIndex} className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-black-200 p-2 rounded"
                    onClick={() => toggleGroupVisibility(group)}
                  >
                    <h2 className="font-bold">{group}</h2>
                    <FontAwesomeIcon
                      icon={groupVisibility[group] ? faChevronDown : faChevronRight}
                      className="icon"
                    />
                  </div>

                  <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                    {groupTickets
                      .slice(0, groupVisibility[group] ? groupTickets.length : 4)
                      .map((ticket, ticketIndex) => (
                        <TicketCard
                          id={ticketIndex}
                          key={ticketIndex}
                          ticket={ticket}
                        />
                      ))}
                  </div>

                  {!groupVisibility[group] && groupTickets.length > 4 && (
                    <div className="text-center text-sm text-gray-500 mt-2">
                      + {groupTickets.length - 4} more tickets
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
