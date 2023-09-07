

import React from 'react';

const Filter = ({ filter, onFilterChange }) => (
  <label>
    Filter contacts by name:
    <input
      type="text"
      value={filter}
      onChange={onFilterChange}
    />
  </label>
);

export default Filter;
