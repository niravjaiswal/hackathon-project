// LeftBox.tsx

import React from 'react'; // Adjust the import path accordingly
import NotesDisplay from './NotesDisplay'; // Adjust the import path accordingly
import FlashcardsDisplay from './FlashcardsDisplay'; // Adjust the import path accordingly
import TranscriptDisplay from './TranscriptDisplay'; // Adjust the import path accordingly
import PromptDisplay from './PromptDisplay'; // Adjust the import path accordingly
import RightBoxContent from './RightBoxContent';
import QuizDisplay from './QuizDisplay';
interface LeftBoxProps {
  tab: string;
  
  notes: string;
  flashcards: Flashcard[];
  currentIndex: number;
  goToPreviousFlashcard: () => void;
  goToNextFlashcard: () => void;
  transcript: string | null;
  gptClicked: boolean;
  GPTPrompt: string;
  handleGPTPromptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitGPTPrompt: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  chatGPTResponse: string | null;
  vidCheck: string | null; // Add these props for RightBoxContent
  videoReady: boolean; // Add these props for RightBoxContent
  check: boolean;
  quiz: QuizQuestion[];
}

interface Flashcard {
  question: string;
  answer: string;
}
interface QuizQuestion {
  id: number;
  text: string;
  options: { id: number; text: string }[];
  correctOption: number;
}
/*const questions = [
  {
    id: 1,
    text: 'How many documents are recommended to be included in your analysis for the DBQ?',
    options: [
      { id: 0, text: '2 documents' },
      { id: 1, text: '4 documents' },
      { id: 2, text: '7 documents' },
      { id: 3, text: '6 documents' },
    ],
    correctOption: 1, // Assuming the second option is correct
  },{
    id: 2,
    text: 'Question#2?',
    options: [
      { id: 0, text: 'Answer#1' },
      { id: 1, text: 'Answer#2' },
      { id: 2, text: '7 documents' },
      { id: 3, text: '6 documents' },
    ],
    correctOption: 1, // Assuming the second option is correct
  },
  // Add more questions here
];*/
const LeftBox: React.FC<LeftBoxProps> = ({
  tab,
  notes,
  flashcards,
  currentIndex,
  goToPreviousFlashcard,
  goToNextFlashcard,
  transcript,
  gptClicked,
  GPTPrompt,
  handleGPTPromptChange,
  handleSubmitGPTPrompt,
  chatGPTResponse,
  vidCheck,
  videoReady,
  check,
  quiz
}) => {
  return (
    <div className="w-full lg:w-full rounded-md p-1" style={{ margin: '10px 10px 10px 10px', marginTop: '13px' }}>
      <div className="w-full idk rounded-md" style={{ padding: '20px' }}>
        
        <NotesDisplay tab={tab} notes={notes} />
        <FlashcardsDisplay tab={tab} flashcards={flashcards} currentIndex={currentIndex} goToPreviousFlashcard={goToPreviousFlashcard} goToNextFlashcard={goToNextFlashcard} />
        <TranscriptDisplay tab={tab} transcript={transcript} />
        <PromptDisplay
          tab={tab}
          gptClicked={gptClicked}
          GPTPrompt={GPTPrompt}
          handleGPTPromptChange={handleGPTPromptChange}
          handleSubmitGPTPrompt={handleSubmitGPTPrompt}
          chatGPTResponse={chatGPTResponse}
        />
        <QuizDisplay tab={tab} questions={quiz}/>
        <RightBoxContent vidCheck={vidCheck} videoReady={videoReady} check={check} tab={tab} />
      </div>
    </div>
  );
};

export default LeftBox;
