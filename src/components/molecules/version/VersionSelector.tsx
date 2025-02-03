import React from 'react';
import useStore from '../../../stores/store';
import { Select } from '../../atoms/select/Select';

export const VersionSelector: React.FC = () => {
  const { versions, selectedVersion, setSelectedVersion, setCurrentData, setFilteredData } = useStore();
  const handleVersionChange = (version: string) => {
    const selectedVersionNumber = Number(version);
    setSelectedVersion(selectedVersionNumber);
    const selectedVersionData = versions.find((v) => v.version === selectedVersionNumber)?.data || [];
    setCurrentData(selectedVersionData);
    setFilteredData(selectedVersionData);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">انتخاب نسخه</h3>
      <Select
        options={versions.map((version) => ({
          value: String(version.version),
          label: String(version.version),
        }))}
        value={String(selectedVersion) || ''}
        onChange={handleVersionChange}
        keyField="value"
        valueField="label"
        className="w-full"
      />
    </div>
  );
};
