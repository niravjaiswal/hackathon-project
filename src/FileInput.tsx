// FileInput.tsx
import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import design1 from './assets/design6.png';

interface FileInputProps {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
  notes?: string | null; // Make 'notes' property optional
  clicked: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ handleFileChange, file, notes, clicked }) => {
  return (
    <div className="outer-container inline-block input-container relative m-4">
      <div className="bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        { !notes && !clicked && (
          <img src={design1} alt="Arrow" className="arrow-image1 custom-hidden" width="300px" />
        )}
        <label className="bg-gray-800 text-white rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faCloudUploadAlt} />
          <input type="file" className="hidden" onChange={handleFileChange} />
          {file && (
            <span className="mr-1" style={{ marginLeft: '10px' }}>
              {file.name.length > 10 ? `${file.name.substring(0, 10)}...` : file.name}
            </span>
          )}
          {file && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
          {!file && <span className="mr-1 custom-hidden" style={{ marginLeft: '10px' }}>Upload File</span>}
        </label>
      </div>
    </div>
  );
};

export default FileInput;




