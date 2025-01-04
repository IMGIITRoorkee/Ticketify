import Link from "next/link";
import { useState, useEffect } from "react";

const NoTicketExistsCard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            setIsLoading(true);
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve([]), 2000)
            );
            setTickets(response);
            setIsLoading(false);
        };

        fetchTickets();
    }, []);

    return (
        <div className="relative h-screen flex items-center justify-center">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="spinner-border animate-spin inline-block w-16 h-16 border-8 rounded-full border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent"></div>
                    <p className="mt-4 text-lg font-medium text-dark gray-700">
                        Loading tickets, please wait...
                    </p>
                </div>
            ) : tickets.length === 0 ? (
        <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div
                className="flex flex-col justify-center text-center hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2"
            >
                <h4 className="mb-1">No Tickets Found</h4>
                <hr className="h-px border-0 bg-page mb-2 " />
                <p className="whitespace-pre-wrap">There are no tickets available at the moment.</p>

                <Link href={"/TicketPage/new"} className="btn my-2 max-w-xs bg-blue-600 text-slate-50 hover:bg-blue-700 hover:text-slate-100">Create A Ticket</Link>
            </div>
        </div>
            ) : (
                <div className="ticket-list">
                    <ul>
                        {tickets.map((ticket, index) => (
                            <li key={index} className="ticket-item">
                                {ticket}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NoTicketExistsCard