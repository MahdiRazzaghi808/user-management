import React, { useMemo, useCallback } from 'react';
import useStore from '../../../stores/store';
import { Select } from '../../atoms/select/Select';
import { Button } from '../../atoms/butoon/Button';

export const Pagination: React.FC = () => {
  const { currentPage, pageSize, setPageSize, filteredData, setCurrentPage } = useStore();

  const pageSizeOptions = useMemo(() => [
    { label: '5 آیتم', value: 5 },
    { label: '10 آیتم', value: 10 },
    { label: '20 آیتم', value: 20 },
    { label: '50 آیتم', value: 50 }
  ], []);

  const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData.length, pageSize]);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages, setCurrentPage]);

  const renderPageNumbers = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => (
      <Button
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        variant={page === currentPage ? 'warning' : 'secondary'}
        className="mx-1"
      >
        {page}
      </Button>
    ));
  }, [currentPage, totalPages, handlePageChange]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-2 sm:space-x-4">
          <div className="sm:hidden flex items-center space-x-2">
            <Button onClick={() => handlePageChange(currentPage - 1)} variant="primary" disabled={isFirstPage}>
              ‹
            </Button>
            <Button onClick={() => handlePageChange(currentPage + 1)} variant="primary" disabled={isLastPage}>
              ›
            </Button>
          </div>

          <div className="hidden sm:flex justify-center items-center space-x-2 sm:space-x-4">
            <Button onClick={() => handlePageChange(1)} variant="primary" disabled={isFirstPage}>
              «
            </Button>
            <Button onClick={() => handlePageChange(currentPage - 1)} variant="primary" disabled={isFirstPage}>
              ‹
            </Button>

            {renderPageNumbers()}

            <Button onClick={() => handlePageChange(currentPage + 1)} variant="primary" disabled={isLastPage}>
              ›
            </Button>
            <Button onClick={() => handlePageChange(totalPages)} variant="primary" disabled={isLastPage}>
              »
            </Button>
          </div>
        </div>
      )}

      <div className="mb-2 w-full sm:w-fit">
        <Select
          options={pageSizeOptions}
          value={String(pageSize)}
          onChange={(value) => setPageSize(Number(value))}
          keyField="value"
          valueField="label"
          className="w-full sm:w-32"
        />
      </div>
    </div>
  );
};