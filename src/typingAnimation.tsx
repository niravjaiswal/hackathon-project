// TypingAnimation.tsx
import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number; // Optional prop for animation speed
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 50 }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const typeText = () => {
      for (let i = 0; i <= text.length; i++) {
        setTimeout(() => {
          setTypedText(text.slice(0, i));
        }, i * speed); // Use the provided speed or default to 50
      }
    };

    typeText();
  }, [text, speed]);

  return <div>{typedText}</div>;
};

export default TypingAnimation;





