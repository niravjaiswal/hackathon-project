import React, { useState, useEffect } from 'react';
import './styles.css';
import yourVideo from './assets/DEMO.mp4';
import yourImage from './assets/logo4.png';
import { useLocation } from 'wouter';
import logo from './assets/logo2.png';
import logo1 from './assets/logo1.png';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import assemblyAI from './assets/assemblyAI.png';
import OpenAI from './assets/OpenAI.png';
import TTS from './assets/TTS.png';
import YouTube from './assets/YouTube.png';
import ConvertAPI from './assets/react.png';
import GoogleCloud from './assets/googleCloud.png';

const LandingPage: React.FC = () => {
    const [, navigate] = useLocation();
    const handleLogoClick = () => {
        navigate('/');
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Simulate checking login status
        // Replace this with your actual login check logic
        const userLoggedIn = localStorage.getItem('user') === 'authenticated';
        setIsLoggedIn(userLoggedIn);
    }, []);
    /*
    const quotes = [
        { text: "I ❤️ LingoSage! It's way better than TurboLearn. -Advay Bajpai" },
        { text: "TurboLearn is terrible never use it 👎" },
        { text: "Knowt pffffffttt lingoSage leaves it in the dust🙈" },
        { text: "Open AI(we def didn't use openAI api to do like everything) 🐒" },
        { text: "LingoSage is so gooooooood 👍 -Menon" },
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
        }, 1000); // Change quote every 3 seconds
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [quotes.length]);
    
      const currentQuote = quotes[currentQuoteIndex];*/
      const [logoSrc, setLogoSrc] = useState(logo);
      useEffect(() => {
        const updateLogoSrc = () => {
            if (window.innerWidth < 768) { // Example breakpoint for small screens
                setLogoSrc(logo1);
            } else {
                setLogoSrc(logo);
            }
        };

        updateLogoSrc(); // Initial check

        window.addEventListener('resize', updateLogoSrc); // Update on resize

        return () => {
            window.removeEventListener('resize', updateLogoSrc); // Cleanup on unmount
        };
    }, []);
    return (
        <div className="bg-[#191919] text-white min-h-screen max-h-screen flex flex-col" >
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4" >
                <img
                    src={logoSrc}
                    alt="Description of the image"
                    style={{ height: '50px', width: 'auto' }}
                    onClick={handleLogoClick}
                />
                <div>
                    
                    
                        <div className="relative inline-flex group ">
    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-3xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt "></div>
    <button
                            onClick={() => navigate(isLoggedIn ? '/input' : '/signup')}
                            className="relative inline-flex items-center justify-center px-8 py-2 text-md font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-3xl focus:outline-none"
                            role="button"
                        >
                            {isLoggedIn ? 'Dashboard' : 'Get Started'}
                        </button>
</div>
                </div>
                
            </nav>

            {/* Main Content */}
            <div className="flex-grow flex flex-col justify-between mt-10 md:mt-20 mx-5 md:mx-10 " >
                {/* Content Area */}
                <div className="flex flex-col md:flex-row flex-1 md:pb-32" >
                    {/* Left Half */}
                    <div className="w-full md:w-3/5 flex flex-col justify-center items-center text-center px-4 md:mt-10">
                        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl mb-3 whitespace-nowrap"><span className = "text-gradient font-bold">Revolutionizing</span> learning 📖</h2>
                        <h3 className="text-3xl md:text-7xl  underlined">
                           
                            Across The World 🌎
                        </h3>
                       {/* <p className="text-gray-500 lg:text-2xl text-xl md:text-lg lg:text-2xl mt-5 h-16 overflow-hidden">
    <span className="block overflow-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {currentQuote.text}
    </span>
</p>*/}

                        
                    </div>

                    {/* Right Half */}
             
                    <div className="relative md:w-2/5 w-full lg:mt-10 rounded-2xl" style={{ overflow: 'visible' }}>
                        <div className="absolute inset-0 transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:duration-200 animate-tilt"></div>
                        <video
                            src={yourVideo}
                            className="relative w-full h-full object-cover cursor-pointer rounded-2xl z-10 border-8 border-white"
                        
                            controls // Optional: adds video controls
                       
                            poster={yourImage}
                        />
                    </div>

                   
                 

                </div>
                <section className=" md:mt-20 mb-20">
                <div className="max-w-4xl mx-auto text-center pb-12 md:pb-1">

                    <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4 mt-20">Learning Made Easy</div>
                    <h1 className="h2 mb-10 text-white text-5xl">Think Smarter Not Harder</h1>
                    <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 ">
                        <a href="#" className="flex justify-center items-center">
                        <img
                    src={OpenAI}
                    alt="Description of the image"
                   
                />
                            
                        </a>
                        <a href="#" className="flex justify-center items-center">
                            
                            <img
                    src={assemblyAI}
                    alt="Description of the image"
                   
                />
                        </a>
                        <a href="#" className="flex justify-center items-center">
                        <img
                    src={TTS}
                    alt="Description of the image"
                   
                />
                        </a>

                        <a href="#" className="flex justify-center items-center">
                        <img
                    src={YouTube}
                    alt="Description of the image"
                   
                />
                        </a>
                        <a href="#" className="flex justify-center items-center">
                        <img
                    src={ConvertAPI}
                    alt="Description of the image"
                   
                />
                        </a>
                        <a href="#" className="flex justify-center items-center">
                        <img
                    src={GoogleCloud}
                    alt="Description of the image"
                   
                />
                        </a>
                    </div>
                    <p className="text-xl text-gray-400 mt-4">
                    LingoSage is a cutting-edge language learning platform that transforms the way we interact with learning materials. It supports video URLs, PDFs, .mp4, and .mp3 files, and offers a unique AI dubbing feature for exploring content in different languages. LingoSage also enhances learning with integrated notes on resources and personalized flashcards to build proficiency. The platform's AI tutor, akin to ChatGPT, engages learners by providing tailored feedback, quizzes, and interactive discussions based on the content, ensuring an engaging and effective learning experience. LingoSage is not just a language tool; it's a revolutionary approach to language education.</p>
                </div>
            </section>

            <section className = "mb-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="py-12 md:py-20  ">

                        <div className="grid gap-20">


                            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">

                                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                                    <img className="max-w-full mx-auto md:max-w-none h-auto" src={image1} width={540} height={405} alt="Features 01" />
                                </div>

                                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                                    <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                       
                                        <h3 className="h3 mb-3 text-3xl">Enhance Language Learning with LingoSage's Features:</h3>
                                        <p className="text-xl text-gray-400 mb-4">LingoSage is your ultimate language learning companion, offering unique features that make language acquisition fun and effective. Here's why you should use LingoSage:</p>
                                        <ul className="text-lg text-gray-400 -mb-2">
                                            <li className="flex items-center mb-2">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Immersive AI Dubbing:</b> Immerse yourself in language learning with LingoSage's AI dubbing. Convert videos, PDFs, and audio into interactive lessons dubbed in your target language for enhanced listening practice.</span>
                                            </li>
                                            <li className="flex items-center mb-2">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Interactive Flashcards:</b> Elevate your language skills with LingoSage's interactive flashcards. Reinforce vocabulary and grammar from your resources on-the-go, making learning efficient and enjoyable.</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Personalized AI Tutoring: </b> Connect with LingoSage's AI tutor for tailored feedback and engaging activities. Take quizzes, join discussions, and accelerate your learning with instant guidance.
</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">

                                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0" data-aos="fade-up">
                                    <img className="max-w-full mx-auto md:max-w-none h-auto rounded-lg" src={image2} width={540} height={405} alt="Features 02" />
                                </div>

                                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                                    <div className="md:pl-4 lg:pl-12 xl:pl-16">
                                        
                                        <h3 className="h3 mb-3 text-3xl">Unlock the Full Potential of Language Learning with LingoSage:</h3>
                                        <p className="text-xl text-gray-400 mb-4">Discover the full potential of language learning with LingoSage:</p>
                                        <ul className="text-lg text-gray-400 -mb-2">
                                            <li className="flex items-center mb-2">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Seamless Resource Integration:</b> LingoSage effortlessly integrates video URLs, PDFs, and audio files to meet your learning needs. Access diverse content in your target language, expanding your linguistic horizons.</span>
                                            </li>
                                            <li className="flex items-center mb-2">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Comprehensive Note-taking:</b> Capture insights and vocabulary directly on your learning resources with LingoSage's note-taking feature. Stay organized and reinforce comprehension as you progress.</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                </svg>
                                                <span><b>Engaging Learning Experience: </b>Enjoy an interactive and personalized learning journey with LingoSage. Dive into language immersion, practice conversational skills, and track your progress effectively.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                            </div>
                            </div>
                    </section>


<footer className=" rounded-lg shadow  m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">LingoSage LLC™</a>. All Rights Reserved.</span>
    </div>
</footer>


                    
            </div>

        </div>
    );
};

export default LandingPage;
