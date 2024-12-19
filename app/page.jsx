"use client"
import { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard"; // Adjust the import according to your file structure

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from MongoDB
    const getTickets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Tickets", {
          cache: "no-store",
        });
    
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
    
        return res.json();
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
      try{
        const data = await res.json();
        setTickets(data.tickets);

      }
      catch(err){
        console.log(err);
        return [];
      }
      finally{
        setLoading(false);
      }
    };
    

    getTickets();
  }, []);

const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : tickets.length === 0 ? (
        <div>
          <h1>No Tickets Found</h1>
          <p>It seems there are no tickets available at the moment. Please try again later or reload the page.</p>
  
        </div>
      ) : (
        <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
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
      )}
    </div>
  );
};

export default Dashboard;
