import React from 'react';

const Header = ({ onGroupChange, onSortChange, currentGroup, currentSort }) => {
  return (
    <header className="header">
      <div className="dropdown-container">
        <label>Grouping</label>
        <select value={currentGroup} onChange={(e) => onGroupChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="dropdown-container">
        <label>Ordering</label>
        <select value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
