import React from 'react';

export const SortArrows = (key, sortConfig, requestSort) => {
  const isActive = sortConfig.key === key;

  if (!isActive) {
    return (
      <span>
        <button className="mr-1 cursor-pointer" onClick={() => requestSort(key)}>
          ▲
        </button>
        <button className="cursor-pointer" onClick={() => requestSort(key)}>
          ▼
        </button>
      </span>
    );
  }

  return (
    <span className="ml-1">
      <button className="cursor-pointer" onClick={() => requestSort(key)}>
        {sortConfig.direction === 'asc' ? '▲' : '▼'}
      </button>
    </span>
  );
};