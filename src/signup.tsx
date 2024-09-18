import React, { FormEvent } from 'react';
import './styles.css';
import Image from './assets/login.jpg';
import { auth, db, createUserWithEmailAndPassword, signInWithPopup, provider } from './firebase'; // Adjust the path as necessary
import { useLocation } from 'wouter';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions


const SignUp: React.FC = () => {
    const [, navigate] = useLocation();

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
            password_confirmation: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;
        const passwordConfirmation = target.password_confirmation.value;

        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a new document in Firestore in the users collection
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                email: email,
                safety_check: {
                    timestamp: serverTimestamp(),
                    count: 0
                }
            });
            localStorage.setItem('user', 'authenticated'); // Set auth status on successful login
            localStorage.setItem('uid', user.uid);
            navigate('/input') // Success - User account created and Firestore document added
        } catch (error: any) {
            alert(error.message);
        }
    };



    async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Check if the user is new and create a document in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                email: user.email, // Google user's email
                safety_check: {
                    timestamp: serverTimestamp(),
                    count: 0
                }
            });
            localStorage.setItem('user', 'authenticated'); // Set auth status on successful login
            localStorage.setItem('uid', user.uid);
            navigate('/input') // Success - User signed in and Firestore document added/updated
        } catch (error: any) {
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

                        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to LingoSage
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-300">
                            A revolutionary way to learn from video content.
                        </p>

                        <form onSubmit={handleSignUp} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="mt-1 w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="mt-1 w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-300">
                                    Password Confirmation
                                </label>
                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    className="mt-1 w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our terms.

                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

                                <div className="relative inline-flex group w-full mt-4">
                                    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt "></div>
                                    <button
                                        className="w-full relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none" // Added mt-4 for margin-top
                                        role="button"
                                    >
                                        Create An Account
                                    </button>
                                </div>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0"> Already have an account? <br /><a href="/login" className="text-gray-700 underline">Log in</a>.</p>
                            </div>
                        </form>




                    </div>
                </main>
            </div>
        </div>
    );
};

export default SignUp;

