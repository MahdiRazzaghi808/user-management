import React, { useState, useEffect } from 'react';
import { Input } from '../../atoms/input/Input';
import useStore from '../../../stores/store';
import { Select } from '../../atoms/select/Select';


export const SearchForm: React.FC = () => {
  const { columns, searchData } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('global');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput !== '') {
      searchData(debouncedSearchInput, searchType);
    } else {
      searchData('', searchType);
    }
  }, [debouncedSearchInput, searchData, searchType]);

  return (
    <div>
      <h3 className='text-lg font-semibold mb-3'>جستجو</h3>
      <div className="flex flex-col md:flex-row gap-3" >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="متن جستجو را وارد کنید"
          className="basis-3/4 w-full"
        />

        <Select
          options={[{ slug: "global", name: "کلی" }, ...columns]}
          value={searchType}
          onChange={(val) => setSearchType(val)}
          keyField="slug"
          valueField="name"
          className="basis-1/4 w-full"
        />
      </div>
    </div>

  );
};