import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './QuizDisplay.css'; // Ensure you create and style this CSS file

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOption: number;
}

interface QuizDisplayProps {
  tab: string;
  questions: Question[];
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ tab, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionClick = (id: number) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset selected option for the next question
      }
    }
  };

  const correctAnswers = questions.filter(
    (question) => question.options[question.correctOption].id === selectedOption
  ).length;

  const handleCompleteQuiz = () => {
    setQuizComplete(true);
  };

  const handleRedoQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizComplete(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedOption !== null;

  return (
    <>
      {tab === 'quiz' && (
        <div className="quiz-container">
          <div className="quiz-header">
            <img src="https://www.turbolearn.ai/_next/static/media/quiz.66434599.svg" alt="Quiz Icon" className="quiz-icon" />
            <h1 className="quiz-title">Quiz Question</h1>
          </div>
          {quizComplete ? (
            <div className="quiz-complete">
              <h2>Quiz Complete 🎉</h2>
              <p>Your score: {correctAnswers} out of {questions.length}</p>
              <button className="redo-button" onClick={handleRedoQuiz}>
                Redo Quiz
              </button>
            </div>
          ) : (
            <>
              <p className="quiz-subtitle">{currentQuestion.text}</p>
              <div className="quiz-options">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={`quiz-option ${isAnswered && (option.id === currentQuestion.correctOption ? 'correct' : 'incorrect')}`}
                    onClick={() => handleOptionClick(option.id)}
                  >
                    {isAnswered && (
                      <FontAwesomeIcon
                        icon={option.id === currentQuestion.correctOption ? faCheck : faTimes}
                        className="icon"
                      />
                    )}
                    <span>{option.text}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                  </div>
                ))}
              </div>
              {isAnswered && currentQuestionIndex < questions.length - 1 && (
                <button className="next-button" onClick={handleNextQuestion}>
                  Next Question <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button className="next-button" onClick={handleCompleteQuiz}>
                  Complete Quiz
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default QuizDisplay;






