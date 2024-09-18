import React, { useEffect } from 'react';
import FileInput from './FileInput';
import YoutubeInput from './YoutubeInput';
import LanguageSelector from './LanguageSelector';
import SecondLanguageSelector from './SecondLanguageSelector';
import load from './assets/load.gif';

interface InputSectionProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
  notes: string | null;
  clicked: boolean;
  youtubeLink: string;
  onYoutubeLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  languages: string[];
  selectedLanguage: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages2: string[];
  selectedLanguage2: string;
  onChange2: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement> ) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  handleFileChange,
  file,
  notes,
  clicked,
  youtubeLink,
  onYoutubeLinkChange,
  languages,
  selectedLanguage,
  onChange,
  languages2,
  selectedLanguage2,
  onChange2,
  handleSubmit,
}) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit(event as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className={`mx-auto flex items-center mb-10 flex-wrap justify-center ${(!clicked && !notes) ? 'md:mt-[15rem]' : 'mt-0'}`}>
      <FileInput handleFileChange={handleFileChange} file={file} notes={notes} clicked={clicked} />
      <YoutubeInput youtubeLink={youtubeLink} notes={notes} clicked={clicked} onYoutubeLinkChange={onYoutubeLinkChange}  />
      <LanguageSelector languages={languages2} selectedLanguage={selectedLanguage2} onChange={onChange2} notes={notes} clicked={clicked} />
      <SecondLanguageSelector languages={languages} selectedLanguage={selectedLanguage} onChange={onChange} notes={notes} clicked={clicked} />
      <div className="input-container relative m-4">
        <button
          className={`py-2 px-4 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${clicked ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-teal-200 to-lime-200 text-black'}`}
          onClick={handleSubmit}
        >
          {!clicked && (<div>Go</div>)}
          {clicked && (<img src={load} alt="Description of the image" width="26" />)}
        </button>
      </div>
    </div>
  );
};

export default InputSection;

