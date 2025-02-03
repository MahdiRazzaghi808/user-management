import React from 'react';
import { SearchForm } from '../../molecules/search-bar/SearchBar';
import { ColumnManager } from '../../organisms/column-manager/ColumnManager';
import { FileUploader } from '../../molecules/uploader/FileUploader';
import { VersionSelector } from '../../molecules/version/VersionSelector';
import { UserTable } from '../../organisms/user-table/UserTable';
import { Pagination } from '../../molecules/pagination/Pagination';
import { ExportControls } from '../../organisms/export-controls/ExportControls';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">مدیریت داده‌ها و خروجی‌گیری</h1>
        <div className='w-full flex flex-col gap-6 justify-between items-center'>
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <SearchForm />
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-md  flex flex-col gap-2">
            <UserTable />
            <Pagination />
          </div>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ExportControls />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <VersionSelector />
            </div>
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <ColumnManager />
          </div>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileUploader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};