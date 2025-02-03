import { Column } from "../../types/columns";

const initalColumns: Column[] = [
    { slug: 'id', name: 'شماره' },
    { slug: 'name', name: 'نام' },
    { slug: 'age', name: 'سن' },
    { slug: 'email', name: 'ایمیل' },
];

const saveColumnsToLocalStorage = (columns: Column[]) => {
    localStorage.setItem('columns', JSON.stringify(columns));
};

const getColumnsFromLocalStorage = (): Column[] => {
    const columns = localStorage.getItem('columns');
    return columns ? JSON.parse(columns) : initalColumns;
};


export { initalColumns, saveColumnsToLocalStorage, getColumnsFromLocalStorage }