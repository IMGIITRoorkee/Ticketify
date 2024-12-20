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

  const isEditable = formData.status === "not started";  // Only allow editing if the status is "not started"

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
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
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
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
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

        <label>
          Title
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            disabled={!isEditable}
            className="form-input"
            title={
              !isEditable
                ? "Editing is disabled because the status is 'started' or 'done'."
                : ""
            }
          />
        </label>

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          required={true}
          rows="5"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
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
          onChange={(e) => handleChange("category", e.target.value)}
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
        <div className="flex flex-col">
          <div className="mb-2">
            <input
              id="priority-1"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
              disabled={!isEditable}
              title={
                !isEditable
                  ? "Editing is disabled because the status is 'started' or 'done'."
                  : ""
              }
            />
            <label>1</label>
          </div>
          
          <div className="mb-2">
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
            <label>2</label>
          </div>
          
          <div className="mb-2">
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
            <label>3</label>
          </div>
          
          <div className="mb-2">
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
            <label>4</label>
          </div>
          
          <div className="mb-2">
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
            <label>5</label>
          </div>
        </div>


        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={(e) => handleChange("progress", e.target.value)}
          disabled={!isEditable}
          title={
            !isEditable
              ? "Editing is disabled because the status is 'started' or 'done'."
              : ""
          }
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
