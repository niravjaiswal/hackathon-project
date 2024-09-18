// TabNavigation.tsx
import React from 'react';

interface TabNavigationProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tab, setTab }) => {
  return (
    <div className="border-b border-white">
      <nav className="-mb-px flex gap-6" aria-label="Tabs">
        <a href="#notes" className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${tab === 'notes' ? 'text-gradient border-gradient hover:border-gradient hover:text-gradient' : 'text-gray-500 hover:border-gradient hover:text-gradient '}`} onClick={() => setTab('notes')}>
          Notes
        </a>
        <a href="#flashcards" className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${tab === 'flashcards' ? 'text-gradient border-gradient hover:border-gradient hover:text-gradient' : 'text-gray-500 hover:border-gradient hover:text-gradient '}`} onClick={() => setTab('flashcards')}>
          Flashcards
        </a>
        <a href="#transcript" className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${tab === 'transcript' ? 'text-gradient border-gradient hover:border-gradient hover:text-gradient' : 'text-gray-500 hover:border-gradient hover:text-gradient '}`} onClick={() => setTab('transcript')}>
          Transcript
        </a>
        <a href="#prompt" className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${tab === 'prompt' ? 'text-gradient border-gradient hover:border-gradient hover:text-gradient' : 'text-gray-500 hover:border-gradient hover:text-gradient '}`} onClick={() => setTab('prompt')}>
          Prompt
        </a>
        <a href="#media" className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${tab === 'media' ? 'text-gradient border-gradient hover:border-gradient hover:text-gradient' : 'text-gray-500 hover:border-gradient hover:text-gradient '}`} onClick={() => setTab('media')}>
          Media
        </a>
      </nav>
    </div>
  );
};

export default TabNavigation;
