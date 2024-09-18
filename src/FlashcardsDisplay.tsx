import React from 'react';
import Flashcard from './flashcard'; // Adjust the import path based on your project structure
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface FlashcardsDisplayProps {
  tab: string;
  flashcards: { question: string; answer: string }[];
  currentIndex: number;
  goToPreviousFlashcard: () => void;
  goToNextFlashcard: () => void;
}

const FlashcardsDisplay: React.FC<FlashcardsDisplayProps> = ({
  tab,
  flashcards,
  currentIndex,
  goToPreviousFlashcard,
  goToNextFlashcard,
}) => {
  return (
    <>
      {tab === 'flashcards' && flashcards.length > 0 && (
        <div className="px-6">
        <div className="flex items-center ml-50">
  <img src="https://www.turbolearn.ai/_next/static/media/cards.b4e1b3ea.svg" alt="Flashcards Icon" className="w-16 h-16 mr-2" />
  <div className="text-left">
    <span className="text-5xl font-bold">Flashcards</span>
    <p className="text-gray-500 text-lg">Study these 10 Flashcards</p>
  </div>
</div>

        <div className="flashcards-container flex flex-col items-left">
          

          <Flashcard key={currentIndex} question={flashcards[currentIndex].question} answer={flashcards[currentIndex].answer} />
          <div className="flex mt-4">
            <button
              className="mx-2 font-black relative"
              onClick={goToPreviousFlashcard}
              style={{ borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#212326', border: '2px solid #fff', fontSize: '20px' }}
            >
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', fontSize: '20px' }} />
            </button>

            <div className="text-center mx-2 font-black raleway-flashcard smthg">
              {currentIndex + 1} / {flashcards.length}
            </div>

            <button
              className="mx-2 font-black relative"
              onClick={goToNextFlashcard}
              style={{ borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#212326', border: '2px solid #fff', fontSize: '20px' }}
            >
              <FontAwesomeIcon icon={faArrowRight} style={{ color: 'white', fontSize: '20px' }} />
            </button>
          </div>
          <div className="mt-16 flex flex-col items-left ">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="flex justify-between p-4 mb-4 rounded-lg shadow-lg" style={{ backgroundColor: '#191919' }}>
                <div className="w-1/2 pr-4 font-bold border-r border-gray-300 text-white">{flashcard.question}</div>
                <div className="w-1/2 pl-4 text-white">{flashcard.answer}</div>
              </div>
            ))}
          </div>
          
        </div>
        </div>
      )}
    </>
  );
};

export default FlashcardsDisplay;
