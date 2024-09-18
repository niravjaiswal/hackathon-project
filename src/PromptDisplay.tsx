import React from 'react';
import TypingAnimation from './typingAnimation'; // Adjust the import path accordingly

interface PromptDisplayProps {
  tab: string;
  gptClicked: boolean;
  GPTPrompt: string;
  handleGPTPromptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitGPTPrompt: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  chatGPTResponse: string | null;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ tab, gptClicked, GPTPrompt, handleGPTPromptChange, handleSubmitGPTPrompt, chatGPTResponse }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitGPTPrompt(event);
    }
  };

  return (
    <>
      {tab === 'prompt' && (
        <div className="px-6">
          <div className="flex items-center ml-50 mb-5">
            <img src="https://www.turbolearn.ai/_next/static/media/chatIcon.b3999193.svg" alt="Flashcards Icon" className="w-16 h-16 mr-2" />
            <div className="text-left">
              <span className="text-5xl font-bold">Lingo Bot</span>
              <p className="text-gray-500 text-lg">Ask questions about your uploaded content! Make Quizzes! Explore your imagination!</p>
            </div>
          </div>
          <div id="toast-simple" className="flex items-center w-full p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-[#191919] divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert" style={{ width: '100%', paddingTop: '20px', marginBottom: '10px' }}>
            <button onClick={handleSubmitGPTPrompt}>
              {!gptClicked && (
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
                </svg>
              )}
              {gptClicked && (
                <div className="bars-2"></div>
              )}
            </button>

            <div className="ps-4 text-sm font-normal" style={{ width: '100%' }}>
              <input
                type="text"
                placeholder="Enter Prompt"
                className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-md w-full"
                value={GPTPrompt}
                onChange={handleGPTPromptChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      )}

      {tab === 'prompt' && chatGPTResponse !== null && (
        <div className="markdown-content mx-7 mb-3 overflow-auto raleway-flashcard" style={{ marginTop: '25px', whiteSpace: 'pre-line', overflowY: 'auto', height: '300px' }}>
          <TypingAnimation key={tab} text={chatGPTResponse ?? ''} speed={10}/>
        </div>
      )}
    </>
  );
};

export default PromptDisplay;

