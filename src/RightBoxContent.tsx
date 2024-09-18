// RightBoxContent.tsx

import React from 'react';
import VideoDisplay from './VideoDisplay'; // Adjust the import path accordingly
import VideoLoader from './VideoLoader'; // Adjust the import path accordingly
import PDFViewer from './PDFViewer'; // Adjust the import path accordingly
import AudioPlayer from './AudioPlayer'; // Adjust the import path accordingly
import soon from './assets/comingsoon.png';
interface RightBoxContentProps {
  vidCheck: string | null;
  videoReady: boolean;
  check: boolean;
  tab: string;
  // Replace 'string' with the actual type of your PDF thumbnail
}

const RightBoxContent: React.FC<RightBoxContentProps> = ({ vidCheck, videoReady, check, tab }) => {
  return (
    <>
      {tab === 'media' && (
        <div className="px-6">
          <div className="flex items-center mx-auto  mb-4">
            <svg className={`w-16 h-16 transition duration-75 ${tab === 'media' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>

            <h1 className="text-white text-5xl font-bold ml-5">Media:</h1>
          </div>

          <VideoDisplay vidCheck={vidCheck} videoReady={videoReady} check={check} />
          <VideoLoader vidCheck={vidCheck} />
          <PDFViewer vidCheck={vidCheck} pdfThumbnail={soon} />
          <AudioPlayer vidCheck={vidCheck} audioSource={'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/outputs/' + localStorage.getItem('uid') + '.mp3'} />
        </div>
      )}
    </>
  );
};

export default RightBoxContent;
