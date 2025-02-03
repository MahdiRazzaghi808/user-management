import React from 'react';
import useStore from '../../../stores/store';
import { Button } from '../../atoms/butoon/Button';

export const FileUploader: React.FC = () => {
  const { uploadFile } = useStore(); 

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file); 
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">آپلود نسخه جدید</h3>
      <input 
        id="fileInput"
        type="file" 
        onChange={handleFileUpload} 
        className="hidden" 
      />
      <Button onClick={triggerFileInput} variant="primary">
        آپلود فایل
      </Button>
    </div>
  );
};