// hooks/usePagination.js
import { useState, useMemo, useEffect } from 'react';

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;

  const paginatedData = useMemo(() => {
    return data?.slice(pageStart, pageEnd);
  }, [data, pageStart, pageEnd]);

  const isFirstPage = currentPage === 1;
  const isLastPage = pageEnd >= data?.length;

  const paginate = (increment) => {
    setCurrentPage((prev) => prev + increment);
  };

  useEffect(() => {
    console.log('current page is: ', currentPage)
  }, [currentPage])

  const resetPagination = () => setCurrentPage(1);

  return {
    paginatedData,
    currentPage,
    isFirstPage,
    isLastPage,
    pageStart,
    pageEnd,
    paginate,
    resetPagination,
  };
};
