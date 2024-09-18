// SecondLanguageSelector.tsx
import React, { ChangeEvent } from 'react';
import design3 from './assets/design10.png';

interface SecondLanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  notes: string | null;
  clicked: boolean;
}

const SecondLanguageSelector: React.FC<SecondLanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onChange,
  notes,
  clicked,
}) => {
  return (
    <div className="input-container relative m-4">
      {!notes && !clicked && (
        <img src={design3} alt="Arrow" className="arrow-image4 custom-hidden" />
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

export default SecondLanguageSelector;
