// LanguageSelector.tsx
import React, { ChangeEvent } from 'react';
import design4 from './assets/design8.png';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  notes: string | null;
  clicked: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onChange,
  notes,
  clicked,
}) => {
  return (
    <div className="input-container relative m-4">
      {!notes && !clicked && (
        <img src={design4} alt="Arrow" className="arrow-image3 custom-hidden" />
      )}
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
        value={selectedLanguage}
        onChange={onChange}
      >
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
