// AudioPlayer.tsx

import React from 'react';

interface AudioPlayerProps {
  vidCheck: string | null;
  audioSource: string; // Replace 'string' with the actual type of your audio source
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ vidCheck, audioSource }) => {
  return (
    <>
      {vidCheck === 'audio' && (
        <div>
          <audio controls>
            <source src={audioSource} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
