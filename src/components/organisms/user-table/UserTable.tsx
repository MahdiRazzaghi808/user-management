import React from 'react';
import useStore from '../../../stores/store';

export const UserTable: React.FC = () => {
  const {
    filteredData,
    currentPage,
    pageSize,
    columns,
    sortOrder,
    setSortOrder,
    setCurrentPage,
    setFilteredData,
  } = useStore();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const toggleSortOrder = (columnSlug: string) => {
    const { filteredData } = useStore.getState();

    const newSortOrder = { [columnSlug]: sortOrder[columnSlug] === 'asc' ? 'desc' : 'asc' };

    setSortOrder(newSortOrder);

    setFilteredData([...filteredData].sort((a, b) => {
      const valueA = a[columnSlug];
      const valueB = b[columnSlug];

      if (newSortOrder[columnSlug] === 'desc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }));

    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.slug}
                onClick={() => toggleSortOrder(col.slug)}
                className="p-2 border cursor-pointer bg-gray-100"
              >
                {col.name} {sortOrder[col.slug] === 'asc' ? '↓' : '↑'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.slug} className="p-2 border text-center">
                  {user[col.slug] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
