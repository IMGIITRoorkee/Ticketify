"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData })
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    router.refresh();
    router.push("/");
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Deveopment",
    "Project",
    "Bug Fix",
    "MVP"
  ];
  const isEditable = formData.status === "not started";

  const deleteTicket = async (e) => {
    e.preventDefault()
    try {
      const conf = confirm("Do you really want to delete the Ticket: " + formData.title)

      if (conf) {
        const res = await fetch(`/api/Tickets/${ticket._id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          }
        });

        if (!res.ok) {
          throw new Error("Failed to delete ticket");
        }
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
          disabled={!isEditable}
          title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
          }
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
          disabled={!isEditable}
          title={
          !isEditable
            ? "Editing is disabled because the status is 'started' or 'done'."
            : ""
          }
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={!isEditable}
          title={
          !isEditable
            ? "Editing is disabled because the status is 'started' or 'done'."
            : ""
          }
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          <label>1</label>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>2</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
            disabled={!isEditable}
            title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
            }
          />
          <label>3</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
            disabled={!isEditable}
            title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
            }
          />
          <label>4</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
            disabled={!isEditable}
            title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
            }
          />
          <label>5</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
            disabled={!isEditable}
            title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
            }
          />
          
        </div>
        <label>Progress</label>
        <div className="relative">
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            step="10"
            onChange={handleChange}
            className="w-full" 
            disabled={!isEditable}
            title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
            }
          />
          <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
            <span className="text-xs">0%</span>
            <span className="text-xs">10%</span>
            <span className="text-xs">20%</span>
            <span className="text-xs">30%</span>
            <span className="text-xs">40%</span>
            <span className="text-xs">50%</span>
            <span className="text-xs">60%</span>
            <span className="text-xs">70%</span>
            <span className="text-xs">80%</span>
            <span className="text-xs">90%</span>
            <span className="text-xs">100%</span>
          </div>
        </div>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <div className="flex flex-row flex-wrap justify-between gap-2">
          <input
            type="submit"
            className="btn max-w-xs"
            value={EDITMODE ? "Update Ticket" : "Create Ticket"}
          />

          {EDITMODE ? <button className="btn max-w-xs bg-red-600 text-slate-50 hover:bg-red-700 hover:text-slate-100" onClick={deleteTicket}>Delete</button> : ""}
        </div>
      </form>
    </div>
  );
};

export default EditTicketForm;