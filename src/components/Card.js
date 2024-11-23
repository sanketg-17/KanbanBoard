import React from 'react';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <span>Priority: {ticket.priority}</span>
    </div>
  );
};

export default Card;
