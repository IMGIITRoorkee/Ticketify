import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(ticket.createdAt);
  const updatedDateTime = formatTimestamp(ticket.updatedAt);

  return (
    <div
      className={`flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2 ${ticket.priority > 4 ? 'bg-red-500' : ''
        }`}
    >
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2 " />
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1"><b>Created At:</b> {createdDateTime}</p>
            <p className="text-xs my-1"><b>Last Updated At:</b> {updatedDateTime}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
        </div>
      </Link>
    </div>
  );

};

export default TicketCard;
