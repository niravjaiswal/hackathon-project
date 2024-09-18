import React, { useState } from 'react';
import './styles.css';
type FlashcardProps = {
    question: string;
    answer: string;
};

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
    console.log(question, answer);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card w-3/4 h-80 m-5" onClick={handleFlip} style={{marginBottom:'0px'}}>
            <div className={`flip-card-inner h-auto w-4/5 ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="flip-card-front   rounded-lg text-lg text-gray-800 text-center  flashcard-style raleway-flashcard" >
                    {question}
                </div>
                <div className="flip-card-back   rounded-lg text-lg text-gray-800 text-center px-5 flashcard-style raleway-flashcard">
                    {answer}
                </div>
            </div>
        </div >
    );
};

export default Flashcard;
