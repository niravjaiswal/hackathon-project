import React from 'react';

interface VideoLoaderProps {
  vidCheck: string | null;
}

const VideoLoader: React.FC<VideoLoaderProps> = ({ vidCheck }) => {
  return (
    <>
      {vidCheck === null && (
        <div className="flex items-center">
          <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.5em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
          <span className="ml-2" style={{ fontSize: '100px' }}>Loading...</span>
        </div>
      )}
    </>
  );
};

export default VideoLoader;

