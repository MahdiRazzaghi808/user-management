import React from 'react';
import useStore from '../../../stores/store';
import { exportToCSV, exportToJSON, exportToXLSX } from '../../../utils/export-file';
import { Button } from '../../atoms/butoon/Button';


export const ExportControls: React.FC = () => {
  const { filteredData } = useStore();

  const handleExport = (format: 'xlsx' | 'csv' | 'json') => {
    if (format === 'xlsx') {
      exportToXLSX(filteredData);
    } else if (format === 'csv') {
      exportToCSV(filteredData);
    } else if (format === 'json') {
      exportToJSON(filteredData);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">خروجی گرفتن</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button onClick={() => handleExport('xlsx')}>خروجی XLSX</Button>
        <Button onClick={() => handleExport('csv')}>خروجی CSV</Button>
        <Button onClick={() => handleExport('json')}>خروجی JSON</Button>
      </div>
    </div>
  );
};