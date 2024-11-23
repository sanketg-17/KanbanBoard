import React from 'react';
import Card from './Card';

const Column = ({ title, tickets }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Column;
