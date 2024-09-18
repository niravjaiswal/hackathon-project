import React, { useState } from 'react';
import { useLocation } from "wouter";
import './styles.css'; // Make sure this path is correct
import { auth, signInWithEmailAndPassword, signInWithPopup, provider, db } from './firebase';
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from './assets/login.jpg'; // Make sure this path is correct

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, navigate] = useLocation();
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const apiCall1 = await fetch('https://lingosage-api-nouboe7drq-uw.a.run.app' + '/ping');
            const response = await apiCall1;
            const data = await response.text();
            console.log(data);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', 'authenticated'); // Set auth status on successful login
            localStorage.setItem('uid', user.uid);
            navigate('/input'); // Adjust the path as necessary
        } catch (error: any) {
            // Handle errors
            alert(error.message);
        }
    };
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    safety_check: {
                        timestamp: serverTimestamp(),
                        count: 0
                    }
                });
            }

            localStorage.setItem('user', 'authenticated');
            localStorage.setItem('uid', user.uid);
            navigate('/input');
        } catch (error: any) {
            alert(error.message);
        }
    };
    async () => {
        try {
            await signInWithPopup(auth, provider);
            localStorage.setItem('user', 'authenticated'); // Set auth status on successful login
            navigate('/input');
        } catch (error: any) {
            // Handle errors
            alert(error.message);
        }
    };

    return (
        <div className="bg-[#191919] min-h-screen">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="Pattern"
                        src={Image}
                        className="absolute inset-0 h-full w-full custom-hidden"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="/">
                            <span className="sr-only">Home</span>
                            {/* SVG logo placeholder */}
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl mb-4">
                            Sign In to LingoSage
                        </h1>

                        <button onClick={handleSignInWithGoogle}
                            className="flex items-center justify-center border-2 border-white text-white py-2 px-4 rounded-lg w-full text-center my-3">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google logo"
                                className="w-6 h-6 mr-3"
                            />
                            Continue with Google
                        </button>
                        <div className="flex flex-row items-center" style={{ gap: '2.2rem', margin: '0 auto', width: 'fit-content' }}>
                            <div className="w-32 border border-gray-200"></div>
                            <span className="text-lg font-semibold text-white">or</span>
                            <div className="w-32 border border-gray-200"></div>
                        </div>
                        <form className='max-w-[400px] w-full mx-auto 0 shadow-xl rounded-lg' onSubmit={handleSignIn}>
                            {/* Email Input */}
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>Email</label>
                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            {/* Password Input */}
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>Password</label>
                                <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            {/* Forgot Password Link */}
                            <div className='flex justify-between text-gray-400 py-2'>
                                <p className='flex items-center'></p>
                                <a href="#">Forgot Password</a>
                            </div>





                            <div className="relative inline-flex group w-full mt-4">
                                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt "></div>
                                <button
                                    type="submit"
                                    className="w-full relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none"
                                    role="button"
                                >
                                    Sign In
                                </button>
                            </div>






                            {/* Google Sign In Button */}


                            {/* Signup Link */}
                            <div className='text-center mt-4'>
                                <span className='text-gray-400'>Don't have an account? </span>
                                <a href="/signup" className='text-blue-500 hover:text-blue-600'>Sign up</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login;
