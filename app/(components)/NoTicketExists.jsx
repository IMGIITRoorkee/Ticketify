import Link from "next/link";

const NoTicketExists = () => {
    return (
        <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div
                className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2"
            >
                <Link href={`/TicketPage/new`} style={{ display: "contents" }}>
                    <h4 className="mb-1">No Tickets Found</h4>
                    <hr className="h-px border-0 bg-page mb-2 " />
                    <p className="whitespace-pre-wrap">No Tickets exists. Create a Ticket now.</p>

                    <div className="flex-grow"></div>
                    {/* <div className="flex mt-2">
              <div className="flex flex-col">
                <p className="text-xs my-1">{createdDateTime}</p>
                <ProgressDisplay progress={ticket.progress} />
              </div>
            </div> */}
                </Link>
            </div>
        </div>
    );
}

export default NoTicketExists