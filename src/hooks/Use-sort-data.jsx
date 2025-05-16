import { useState, useMemo } from 'react';

export function useSortData(items, config = { key: 'createdAt', direction: 'desc' }) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    if (!items) return [];

    const safeCompare = (a, b) => {
      if (!a && !b) return 0;
      if (!a) return -1;
      if (!b) return 1;
      return a.localeCompare(b);
    };

    const sorted = [...items].sort((a, b) => {
      const { key, direction } = sortConfig;

      if (key === 'createdAt') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }

      return direction === 'asc'
        ? safeCompare(a[key] || '', b[key] || '')
        : safeCompare(b[key] || '', a[key] || '');
    });

    return sorted;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}