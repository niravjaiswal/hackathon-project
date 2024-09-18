import React from 'react';
import ReactMarkdown from 'react-markdown';

interface TranscriptDisplayProps {
  transcript: string | null;
  tab: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, tab }) => {
  return (
    <>
      {tab === 'transcript' && transcript && (
        <div className = "px-6">
        <span className="text-5xl font-bold mb-5">Transcript</span>
        <div className="markdown-content  mb-3 overflow-auto raleway-flashcard" style={{ marginTop: '25px', overflowY: 'auto', height: '700px' }}>
          

          <ReactMarkdown>
            {transcript.replace?.(/^-\s*/gm, '\n• ') ?? ''}
          </ReactMarkdown>
        </div>
        </div>
      )}
    </>
  );
};

export default TranscriptDisplay;
