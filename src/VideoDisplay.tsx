// VideoDisplay.tsx

import React from 'react';

interface VideoDisplayProps {
  vidCheck: string | null;
  videoReady: boolean;
  check: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ vidCheck, videoReady, check }) => {
  return (
    <>
      {vidCheck === 'VideoURL' && (
        <div className=" p-4 flex justify-center items-center video-container">
          {videoReady && (check ? (
            <video controls style={{ margin: '0 0px 0px 0px', borderRadius: '10px', alignSelf: 'center' }}>
              <source src={'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/outputs/' + localStorage.getItem('uid') + '.mp4'} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          ) : (
            <video controls style={{ margin: '0 0px 10px 0px', borderRadius: '10px', alignSelf: 'center' }}>
              <source src={'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/outputs/' + localStorage.getItem('uid') + '.mp4'} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          )
          )}
        </div>
      )}
    </>
  );
};

export default VideoDisplay;


