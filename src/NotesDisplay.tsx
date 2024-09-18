import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles.css';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface NotesDisplayProps {
  tab: string;
  notes?: string | null;
}

const NotesDisplay: React.FC<NotesDisplayProps> = ({ tab, notes }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (notes) {
      navigator.clipboard.writeText(notes).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        
      }, () => {
        alert('Failed to copy notes.');
      });
    }
  };

  return (
    <>
      {tab === 'notes' && notes && (
        <div>
          <div className="flex items-center ml-50 px-6 relative">
           
            <span className = "w-16 h-16 mr-2 text-6xl">📝</span>
            <div className="text-left">
              <span className="text-5xl font-bold">Notes</span>
              <p className="text-gray-500 text-lg">Think Smarter Not Harder!!</p>
            </div>
            <button onClick={copyToClipboard} className="absolute right-0 top-0 mt-4 mr-4">
              {copied ? (
                <FontAwesomeIcon icon={faCheck} className="text-green-500 w-14 h-14 transition-transform transform rotate-0 scale-0" style={{ animation: 'rotateScale 0.5s forwards' }} />
              ) : (
                <FontAwesomeIcon icon={faCopy} className="text-white w-14 h-14" />
              )}
            </button>
          </div>
          <div className="markdown-content mx-7 mb-3" style={{ marginTop: '25px' }}>
            <ReactMarkdown className="markdown" children={notes} remarkPlugins={[remarkGfm]} />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesDisplay;

