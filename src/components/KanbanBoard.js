import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/api";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [grouping, setGrouping] = useState("status"); // Default grouping by Status
  const [sorting, setSorting] = useState("priority"); // Default sorting by Priority
  const [searchTerm, setSearchTerm] = useState(""); // For filtering tickets

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // Group tickets based on the selected option
  const groupTickets = () => {
    if (grouping === "status") {
      return groupTicketsByStatus();
    } else if (grouping === "user") {
      return groupTicketsByUser();
    } else if (grouping === "priority") {
      return groupTicketsByPriority();
    }
  };

  // Group tickets by status
  const groupTicketsByStatus = () => {
    const statuses = ["Todo", "In progress", "Backlog"];
    return statuses.map((status) => ({
      status,
      tickets: tickets
        .filter((ticket) => ticket.status === status)
        .filter((ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));
  };

  // Group tickets by user
  const groupTicketsByUser = () => {
    return users.map((user) => ({
      user,
      tickets: tickets
        .filter((ticket) => ticket.userId === user.id)
        .filter((ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));
  };

  // Group tickets by priority
  const groupTicketsByPriority = () => {
    return [0, 1, 2, 3, 4].map((priority) => ({
      priority,
      tickets: tickets
        .filter((ticket) => ticket.priority === priority)
        .filter((ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));
  };

  // Sort tickets based on the selected option
  const sortTickets = (ticketsList) => {
    if (!ticketsList) return [];
    if (sorting === "priority") {
      return ticketsList.sort((a, b) => b.priority - a.priority); // Sort by priority (descending)
    } else if (sorting === "title") {
      return ticketsList.sort((a, b) =>
        a.title.localeCompare(b.title)
      ); // Sort by title (ascending)
    }
    return ticketsList;
  };

  // Displaying the grouped tickets
  const renderTickets = (groupedTickets) => {
    return groupedTickets.map((group, index) => {
      const ticketsToDisplay = sortTickets(group.tickets);
      return (
        <div key={index} className="kanban-column">
          <h3>
            {grouping === "status"
              ? group.status
              : grouping === "user"
              ? group.user.name
              : `Priority ${group.priority}`}
          </h3>
          {ticketsToDisplay.map((ticket) => (
            <div key={ticket.id} className="kanban-card">
              <h4>{ticket.title}</h4>
              <p>Priority: {ticket.priority}</p>
              <p>
                Assigned to:{" "}
                {users.find((user) => user.id === ticket.userId)?.name || "N/A"}
              </p>
            </div>
          ))}
        </div>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      {/* Grouping Dropdown */}
      <div className="controls">
        <label htmlFor="grouping-select">Group By: </label>
        <select
          id="grouping-select"
          onChange={(e) => setGrouping(e.target.value)}
          value={grouping}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label htmlFor="sorting-select">Sort By: </label>
        <select
          id="sorting-select"
          onChange={(e) => setSorting(e.target.value)}
          value={sorting}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>

        <input
          type="text"
          placeholder="Search Tickets"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="kanban-board">{renderTickets(groupTickets())}</div>
    </div>
  );
};

export default KanbanBoard;