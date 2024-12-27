import Link from "next/link";

const NoTicketExists = () => {
    return (
        <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div
                className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2"
            >
                <h4 className="mb-1">No Tickets Found</h4>
                <hr className="h-px border-0 bg-page mb-2 " />
                <p className="whitespace-pre-wrap">There are no tickets available at the moment.</p>

                <div className="flex-grow"></div>
                <Link href={"/TicketPage/new"} className="btn my-2 max-w-xs bg-blue-600 text-slate-50 hover:bg-blue-700 hover:text-slate-100">Create A Ticket</Link>
            </div>
        </div>
    );
}

export default NoTicketExists