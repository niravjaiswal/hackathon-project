import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLocation } from 'wouter';
import useAuth from './useAuth';
import Flashcard from './flashcard';
import 'flowbite';
import InputSection from './InputSection';
import LeftBox from './LeftBox';
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path as necessary
import logo from './assets/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

async function getAudioDuration(file: File | undefined): Promise<number> {
  if (!file) {
    throw new Error("No file provided");
  }

  const buffer = await file.arrayBuffer();
  if (!buffer) {
    throw new Error("Failed to read file");
  }

  // Check if buffer is null
  if (buffer === null) {
    throw new Error("Buffer is null");
  }

  const blob = new Blob([buffer]);
  const audio = new Audio();
  audio.src = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });

    audio.addEventListener('error', (err) => {
      reject(err);
    });
  });
}

async function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = (err) => {
      reject(err);
    };

    video.src = URL.createObjectURL(file);
  });
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
const VideoInput: React.FC = () => {
  const isAuthenticated = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  const [youtubeLink, setYoutubeLink] = useState('');
  const [check, setCheck] = useState(false);
  const [vidCheck, setvidCheck] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null); // New state for transcript
  const [language, setLanguage] = useState('English');
  const languages = ["English", "Chinese", "Spanish", "Hindi", "French", "Russian", "Portuguese", "German", "Japanese", "Italian", "Dutch", "Finnish", "Korean", "Turkish", "Ukrainian", "Vietnamese"];
  const [language2, setLanguage2] = useState('English');
  const languages2 = ["English", "Chinese", "Spanish", "Hindi", "French", "Russian", "Portuguese", "German", "Japanese", "Italian", "Dutch", "Finnish", "Korean", "Turkish", "Ukrainian", "Vietnamese"];
  const [GPTPrompt, setGPTPrompt] = useState<string>('');
  const [tab, setTab] = useState('notes'); // For switching between tabs
  const [, setApiResponse] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [chatGPTResponse, setchatGPTResponse] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [gptClicked, setgptClicked] = useState(false);
  const [videoReady, setvideoReady] = useState(false);
  const [, setloadingVideo] = useState(false);
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    }
    console.log('target', target.files)
    setFile(target.files[0]);
  };
  {/* Navbar */ }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };


  {/* Main slection bar */ }
  const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(event.target.value);
  };
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleLanguageChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage2(event.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uid = localStorage.getItem('uid');
    if (uid) {
      const userRef = doc(db, "users", uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const safetyCheck = userData.safety_check;
          const safetyCheckDate = safetyCheck.timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
          const currentDate = new Date();

          // Check if the timestamp is the same day as the current date
          if (safetyCheckDate.toDateString() === currentDate.toDateString()) {
            if (safetyCheck.count >= 20) {
              alert("Too many requests today.");
              return;
            } else {
              // Increment the count since it's the same day and count is less than 3
              await updateDoc(userRef, {
                "safety_check.count": safetyCheck.count + 1
              });
            }
          } else {
            // If it's a different day, reset the timestamp and count
            await updateDoc(userRef, {
              "safety_check.timestamp": serverTimestamp(),
              "safety_check.count": 1
            });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    } else {
      // handle the case where uid is null, such as by showing an error message
      alert("UID is null. User might not be signed in.");
    }

    if (youtubeLink) {
      setClicked(true);
      setNotes(null);
      setTranscript(null);
      setvidCheck(null);
      try {
        const checkVideoLengthResponse = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/check_video_length', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtube_url: youtubeLink }),
        });

        const checkVideoLengthData = await checkVideoLengthResponse.json();

        if (checkVideoLengthResponse.ok && checkVideoLengthData.video_long) {
          alert("The video duration is greater than 1800 seconds. Please choose a shorter video.");
          setYoutubeLink('');
          setClicked(false);
          return;  // Do not proceed further
        }
        const apiCall1 = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtube_link: youtubeLink, lang: language, lang2: language2, uid: uid }),
        });
        const response = await apiCall1;
        const data = await response.json();

        if (response.ok && data.notes) {
          setNotes(data.notes); // Set the notes received from the API
          console.log("success");
          if (data.flashcards) {
            console.log(data.flashcards);
            if (typeof data.flashcards === 'string') {
              const parsedFlashcards = JSON.parse(data.flashcards);
              setFlashcards(parsedFlashcards);
              console.log(parsedFlashcards);
              console.log(flashcards);
            } else {
              setFlashcards(data.flashcards);
              console.log(flashcards);
            }
          }
          if (data.quiz){
            console.log(data.quiz);
            setQuiz(data.quiz);
          }
          
          if (data.transcript) {
            setTranscript(data.transcript); // Set the transcript received from the API
          }
          /*if (data.quiz) {
            const parsedQuiz = typeof data.quiz === 'string' ? JSON.parse(data.quiz) : data.quiz;
            setQuiz(parsedQuiz); // Set quiz data received from the API
          }*/

        } else {
          console.error('API response not successful:', data);
          setNotes(null);
          setTranscript(null);
          setClicked(false);
        }
        const apiCall2 = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/processvid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtube_link: youtubeLink, lang: language, lang2: language2, uid: uid }),
        });
        setloadingVideo(true);
        const response2 = await apiCall2;
        const data2 = await response2.json();
        if (response2.ok) {
          setloadingVideo(false);
          setApiResponse(`output_audio.mp3`);
          setCheck(data2.check);
          console.log(data2.check);
          setvidCheck(data2.vidCheck);
          setvidCheck("VideoURL");
          console.log("success");
          setvideoReady(true);
          setYoutubeLink('');
          setClicked(false);

        } else {
          console.error('API response not successful:', data);
          setApiResponse(null);
          setClicked(false);
        }

      } catch (error) {
        console.error('Error:', error);
        setApiResponse(null);

      } finally {
        setClicked(false);
      }
    } else if (file) {
      setClicked(true);
      const fileType = file?.name.split('.').pop()?.toLowerCase();

      console.log('file', file);
      try {
        const uid = localStorage.getItem('uid');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('lang', language);
        formData.append('lang2', language2);

        // Ensure uid is available and convert it to a string
        if (uid !== null && uid !== undefined) {
          formData.append('uid', uid.toString());
        } else {
          console.error('UID is not available');
        }
        let endpoint;
        if (fileType === 'pdf') {
          endpoint = 'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/processPDF';
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          if (response.ok && data.notes) {
            setNotes(data.notes);
            setvidCheck(data.vidCheck);
            console.log("success");
            if (data.flashcards) {
              console.log(data.flashcards);
              if (typeof data.flashcards === 'string') {
                const parsedFlashcards = JSON.parse(data.flashcards);
                setFlashcards(parsedFlashcards);
                console.log(parsedFlashcards);
                console.log(flashcards);
              } else {
                setFlashcards(data.flashcards);
                console.log(flashcards);
              }
            }
            if (data.quiz){
              console.log(data.quiz);
              setQuiz(data.quiz);
            }
            if (data.transcript) {
              setTranscript(data.transcript); // Set the transcript received from the API
            }
            setFile(undefined);
            setClicked(false);
          } else {
            console.error('API response not successful:', data);
            setNotes(null);
            setTranscript(null);
            setClicked(false);// Clear transcript in case of failure
          }
        } else if (fileType === 'mp3') {
          const audioDuration = await getAudioDuration(file); // Implement a function to get audio duration
          if (audioDuration > 30 * 60) {
            alert("The video duration is greater than 1800 seconds. Please choose a shorter video.");
            setYoutubeLink('');
            setClicked(false);
            return;
          } else {
            console.log("not too long");
          }
          endpoint = 'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/process_audio';
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          if (response.ok && data.notes) {
            setNotes(data.notes);
            console.log("success");
            if (data.flashcards) {
              console.log(data.flashcards);
              if (typeof data.flashcards === 'string') {
                const parsedFlashcards = JSON.parse(data.flashcards);
                setFlashcards(parsedFlashcards);
                console.log(parsedFlashcards);
                console.log(flashcards);
              } else {
                setFlashcards(data.flashcards);
                console.log(flashcards);
              }
            }
            if (data.quiz){
              console.log(data.quiz);
              setQuiz(data.quiz);
            }
            if (data.transcript) {
              setTranscript(data.transcript); // Set the transcript received from the API
            }

          } else {
            console.error('API response not successful:', data);
            setNotes(null);
            setTranscript(null); // Clear transcript in case of failure
            setClicked(false);
          }
          const response2 = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/process_audio2', { method: 'POST', body: formData });

          await response2.json();
          if (response2.ok) {
            setApiResponse(`output_audio.mp3`);
            setvidCheck("audio");
            console.log("success");
            setFile(undefined);
            setClicked(false);

          } else {
            console.error('API response not successful:', data);
            setClicked(false);
          }
        }
        else if (fileType === 'mp4' || fileType === 'webm') {
          const videoDuration = await getVideoDuration(file);
          if (videoDuration > 30 * 60) {
            alert("The video duration is greater than 30 minutes. Please choose a shorter video.");
            setClicked(false);
            return;
          } else {
            console.log("not too long");
          }

          endpoint = 'https://lingosage-api-nouboe7drq-uw.a.run.app' + '/process_video_file';
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();

          if (response.ok && data.notes) {
            setNotes(data.notes);
            console.log("success");
            if (data.flashcards) {
              console.log(data.flashcards);
              if (typeof data.flashcards === 'string') {
                const parsedFlashcards = JSON.parse(data.flashcards);
                setFlashcards(parsedFlashcards);
                console.log(parsedFlashcards);
                console.log(flashcards);
              } else {
                setFlashcards(data.flashcards);
                console.log(flashcards);
              }
            }
            if (data.quiz){
              console.log(data.quiz);
              setQuiz(data.quiz);
            }
            if (data.transcript) {
              setTranscript(data.transcript);
            }
          } else {
            console.error('API response not successful:', data);
            setClicked(false);
            setNotes(null);
            setTranscript(null);
          }

          const apiCall2 = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/process_video_file2', {
            method: 'POST',
            body: JSON.stringify({ lang: language, lang2: language2, uid: uid }),
          });
          setloadingVideo(true);
          const response2 = await apiCall2;
          const data2 = await response2.json();

          if (response2.ok) {
            setloadingVideo(false);
            setApiResponse(`output_audio.mp3`);
            setCheck(data2.check);
            console.log(data2.check);
            setvidCheck(data2.vidCheck);
            setvidCheck("VideoURL");
            console.log("success");
            setvideoReady(true);
            setClicked(false);
          } else {
            console.error('API response not successful:', data2);
            setApiResponse(null);
            setloadingVideo(false);
          }

        }
      } catch (error) {
        console.error('Error:', error);

      }

    }
  };
  //GPT Prompt
  const handleGPTPromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGPTPrompt(event.target.value);
  };

  useEffect(() => {
    if (tab !== 'prompt') {
      setchatGPTResponse('');
    }
  }, [tab]);
  const handleSubmitGPTPrompt = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (GPTPrompt) {
      setgptClicked(true);
      try {
        const response = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/processGPT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: GPTPrompt }),
        });
        const data = await response.json();
        if (response.ok && data.gptResponse) {
          setchatGPTResponse(data.gptResponse);
          console.log("success");
          setgptClicked(false);
          setGPTPrompt('');
        } else {
          console.error('ChatGPT response not successful:', data);
          setchatGPTResponse(null); // Clear transcript in case of failure
        }
      } catch (error) {
        console.error('Error:', error);
        setchatGPTResponse(null);// Clear transcript in case of error
      }
    }
  };
  //Flashcards

  const goToNextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const goToPreviousFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };
  const uid = localStorage.getItem('uid');
  const [email, setEmail] = useState('Loading email...'); // Initial state

  useEffect(() => {
    const getEmail = async () => {
      if (uid) {
        const userRef = doc(db, 'users', uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const fetchedEmail = docSnap.data().email;
            setEmail(truncateEmail(fetchedEmail, 22)); // Update state with the truncated email
          } else {
            setEmail('No email found');
          }
        } catch (error) {
          console.error('Error getting document:', error);
          setEmail('Error getting email');
        }
      } else {
        console.log('UID is null. User might not be signed in.');
        setEmail('Error getting email');
      }
    };

    getEmail();
  }, [uid, db]);
  const truncateEmail = (email: string, maxLength: number): string => {
    if (email.length > maxLength) {
      return email.substring(0, maxLength) + '...';
    }
    return email;
  };
  const quotes = [
    { text: "I ❤️ LingoSage! It's way better than TurboLearn. -Advay Bajpai" },
    { text: "TurboLearn 👎" },
    { text: "Knowt 🙈" },
    { text: "Open AI 🐒" },
    { text: "LingoSage 👍" },
    { text: "This def. not cheating tool＃① 🏆" },
    { text: "I'm a computational linguist!!!" },
    { text: "STANFORD pweaseeeeeeeeeee!!!" },
    { text: "Think Smarter🧠 Not Harder💪" },
    { text: "LINGOOOOOOOOO SAGEEEEEE😁" },
    { text: "Isn't this just chat gpt???? 😭😢" },
    // Add more quotes as needed
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [quotes.length]);

  const currentQuote = quotes[currentQuoteIndex];
  const circleStyle = {
    width: 'fit-content', // Adjust as needed
    height: 'fit-content', // Adjust as needed
    padding: '5px', // Adjust as needed for spacing
    borderRadius: '30%', // Creates a circle
    border: '2px solid white', // White circle border
  };
  return (
    <div className="bg-[#191919]">
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="mt-3 inline-flex items-center p-4 mt-0 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-[#212326] focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-500">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>




      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#212326]" style={{ borderRight: '' }}>
          <img
            src={logo}
            alt="Description of the image"
            width="300"
            onClick={handleLogoClick}
          />
          {notes && (
            <ul className="space-y-2 font-medium mt-5">
              <li>
                <a href="#notes"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'notes' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('notes')}>

                  <span >📝</span>
                  <span className="ms-3">Notes</span>
                </a>
              </li>
              <li>
                <a href="#flashcards"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'flashcards' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('flashcards')}>

                  <img className="w-4 h-4" src={"https://www.turbolearn.ai/_next/static/media/cards.b4e1b3ea.svg"} alt="Link to your page" />
                  <span className="ms-3">Flashcards</span>
                </a>
              </li>
              <li>
                <a href="#transcript"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'transcript' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('transcript')}>

                  <span >📃</span>
                  <span className="ms-3">Transcript</span>
                </a>
              </li>
              <li>
                <a href="#prompt"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'prompt' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('prompt')}>
                  <img className="w-4 h-4" src={"https://www.turbolearn.ai/_next/static/media/chatIcon.b3999193.svg"} alt="Link to your page" />



                  <span className="ms-3">Prompt</span>
                </a>
              </li>
              <li>
                <a href="#quiz"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'quiz' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('quiz')}>
                  <span className="">📈</span>

                  <span className="ms-3">Quiz</span>
                </a>
              </li>
              <li>
                <a href="#media"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'media' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('media')}>
                  <span >🎥</span>

                  <span className="ms-3">Media</span>
                </a>
              </li>




            </ul>
          )}
          {!notes && (
            <ul className="space-y-2 font-medium mt-5">
              <li>
                <a href="#notes"
                  className={`flex items-center p-2 rounded-lg text-white ${tab === 'notes' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-700'}`}
                  onClick={() => setTab('notes')}>

                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50"
                    style={{ fill: '#FFFFFF' }}>
                    <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>





            </ul>
          )}
          <div className="fixed bottom-0 left-0 mb-0 p-4 ">
            <div className="max-w-screen-lg mx-auto">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
              <div className="flex items-center space-x-3 text-white">
                <div style={circleStyle}>
                  <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} /></div>
                <span>{email}</span>
              </div>
            </div>
          </div>


        </div>
      </aside>


      <div className="bg-[#191919] text-white min-h-screen flex flex-col p-4 ml-0 px-0 md:ml-64 md:px-16 ">

        {/* <Navbar handleLogoClick={handleLogoClick} handleLogout={handleLogout} /> */}
        {!notes && !clicked && (
          <div className="ml-4 md:ml-0">
            <span className="text-5xl font-bold">Dashboard</span>
            <p className="text-gray-500 lg:text-2xl text-xl md:text-lg lg:text-2xl mt-5 h-16 overflow-hidden">
              <span className="block overflow-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {currentQuote.text}
              </span>
            </p>


          </div>
        )}
        <InputSection handleFileChange={handleFileChange} file={file} notes={notes} clicked={clicked} youtubeLink={youtubeLink} onYoutubeLinkChange={handleYoutubeLinkChange} languages={languages} selectedLanguage={language} onChange={handleLanguageChange} languages2={languages2} selectedLanguage2={language2} onChange2={handleLanguageChange2} handleSubmit={handleSubmit} />
        <div className="flex flex-col lg:flex-row flex-grow justify-center">
          {notes && (
            <>
              <LeftBox quiz = {quiz} tab={tab} notes={notes} flashcards={flashcards} currentIndex={currentIndex} goToPreviousFlashcard={goToPreviousFlashcard} goToNextFlashcard={goToNextFlashcard} transcript={transcript} gptClicked={gptClicked} GPTPrompt={GPTPrompt} handleGPTPromptChange={handleGPTPromptChange} handleSubmitGPTPrompt={handleSubmitGPTPrompt} chatGPTResponse={chatGPTResponse} vidCheck={vidCheck} videoReady={videoReady} check={check} />

            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoInput;
