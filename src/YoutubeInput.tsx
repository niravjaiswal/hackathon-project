// YoutubeInput.tsx
import React, { ChangeEvent } from 'react';
import design2 from './assets/design4.png';

interface YoutubeInputProps {
  youtubeLink: string;
  notes: string | null; // Add the missing 'notes' property
  clicked: boolean; // Add the missing 'clicked' property
  onYoutubeLinkChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const YoutubeInput: React.FC<YoutubeInputProps> = ({ youtubeLink, notes, clicked, onYoutubeLinkChange }) => {
  return (
    <div className="input-container relative m-4">
      {!notes && !clicked && (
        <img src={design2} alt="Arrow" className="arrow-image2 custom-hidden" />
      )}
      <input
        type="text"
        placeholder="Enter URL"
        className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-md w-full"
        style={{ width: '300px' }}
        value={youtubeLink}
        onChange={onYoutubeLinkChange}
      />
    </div>
  );
};

export default YoutubeInput;

