import { useMemo, useState } from "react";

type Params<T> = { data: T[] | undefined; itemsPerPage: number };
export function usePagination<T>({ data, itemsPerPage = 10 }: Params<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data ? Math.ceil(data?.length / itemsPerPage) : 0;

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canGoToNextPage = currentPage < totalPages;
  const canGoToPreviousPage = currentPage > 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    getPageNumbers,
  };
}