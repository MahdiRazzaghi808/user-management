import { create } from 'zustand';
import { Column } from '../types/columns';
import { getColumnsFromLocalStorage, saveColumnsToLocalStorage } from '../utils/localSrorage';
import { Version } from '../types/version';
import { getVersionsFromIndexedDB, initialFetchData, saveVersionToIndexedDB } from '../utils/indexedDB';

interface Store {
  currentData: any[];
  filteredData: any[];
  currentPage: number;
  pageSize: number;
  columns: Column[];
  sortOrder: Record<string, any>;
  versions: Version[];
  selectedVersion: number;

  setCurrentData: (data: any[]) => void;
  setFilteredData: (data: any[]) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setColumns: (columns: Column[]) => void;
  setSortOrder: (order: Record<string, any>) => void;
  setVersions: (versions: Version[]) => void;
  setSelectedVersion: (version: number) => void;

  searchData: (query: string, type: string) => void;
  addColumn: (columnName: string) => void;
  removeColumn: (columnName: string) => void;
  editColumn: (oldName: string, newName: string) => void;
  uploadFile: (file: File) => Promise<void>;
  loadInitialData: () => Promise<void>;
}

const useStore = create<Store>((set, get) => ({
  currentData: [],
  filteredData: [],
  currentPage: 1,
  pageSize: 5,
  columns: getColumnsFromLocalStorage(),
  sortOrder: {},
  versions: [],
  selectedVersion: 1,

  setCurrentData: (data) => set({ currentData: data, filteredData: data }),
  setFilteredData: (data) => set({ filteredData: data }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  
  setColumns: (columns) => {
    saveColumnsToLocalStorage(columns);
    set({ columns });
  },

  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),
  setVersions: (versions) => set({ versions }),
  setSelectedVersion: (selectedVersion) => set({ selectedVersion }),

  searchData: (query, type) => {
    const { currentData } = get();
    const filtered = currentData.filter((item) =>
      type === 'global'
        ? Object.values(item).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase())
          )
        : String(item[type] || '').toLowerCase().includes(query.toLowerCase())
    );

    set({ filteredData: filtered, currentPage: 1 });
  },

  addColumn: (columnName) => {
    const { columns } = get();
    const newColumn = { slug: columnName.toLowerCase(), name: columnName };

    if (!columns.some((col) => col.slug === newColumn.slug)) {
      const newColumns = [...columns, newColumn];
      saveColumnsToLocalStorage(newColumns);
      set({ columns: newColumns });
    }
  },

  removeColumn: (columnName) => {
    const { columns } = get();
    if (columns.length > 1) {
      const newColumns = columns.filter((col) => col.slug !== columnName);
      saveColumnsToLocalStorage(newColumns);
      set({ columns: newColumns });
    }
  },

  editColumn: (slug, newName) => {
    const { columns } = get();
    const newColumns = columns.map((col) =>
      col.slug === slug ? { ...col, name: newName } : col
    );

    saveColumnsToLocalStorage(newColumns);
    set({ columns: newColumns });
  },

  uploadFile: async (file) => {
    try {
      if (file.type !== 'application/json') {
        throw new Error('فرمت فایل نامعتبر است! فقط فایل‌های JSON مجاز هستند.');
      }

      const fileContent = await file.text();
      const data = JSON.parse(fileContent);
      const versions = await getVersionsFromIndexedDB();
      const newVersion = { version: versions.length + 1, data };

      await saveVersionToIndexedDB(newVersion);
      const updatedVersions = await getVersionsFromIndexedDB();

      set({
        versions: updatedVersions,
        currentData: data,
        filteredData: data,
        selectedVersion: newVersion.version,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert((error as any).message);
    }
  },

  loadInitialData: async () => {
    try {
      const columns = getColumnsFromLocalStorage();
      let versions = await getVersionsFromIndexedDB();
      
      if (versions.length === 0) {
        const initialData = await initialFetchData();
        const newVersion = { version: 1, data: initialData };
        await saveVersionToIndexedDB(newVersion);
        versions = [newVersion];
      }
  
      set({
        columns,
        versions,
        currentData: versions[versions.length - 1].data,
        filteredData: versions[versions.length - 1].data,
        selectedVersion: versions[versions.length - 1].version,
      });
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  },
  
}));

export default useStore;
