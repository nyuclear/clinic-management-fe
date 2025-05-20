import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="Card flex justify-between items-center">
      <div className="Card-title">{title}</div>
      <div className="Card-content">{content}</div>
    </div>
  );
};

export default Card;