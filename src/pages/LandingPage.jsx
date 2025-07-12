import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaShieldAlt, FaExchangeAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import Img from '../assets/landing/mobile.png'
const LandingPage = () => {
    return (
        <div className="w-full text-white bg-[#010080] ">

            <Navbar />


            <div className='px-4 sm:px-6 lg:px-8 py-10'>
                {/* Hero Section */}
                <section className=" text-white pb-20 py-10 flex justify-between items-start flex-wrap">

                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Qosyne</h1>
                        <p className="text-lg sm:text-xl max-w-2xl">The easiest way to send, receive, and manage money across platforms—securely and instantly.</p>
                        <div className="mt-6">
                            <Link to="/" className="bg-white text-black py-2 px-6 rounded-full hover:bg-gray-200 transition">Download App</Link>
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section className="py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">About Qosyne</h2>
                    <p className=" max-w-3xl mx-auto text-lg">
                        Qosyne is a peer-to-peer (P2P) and Business to Consumer (B2C) payment app that enables users to send and receive money directly using a mobile device—even across different platforms. Whether you're splitting a bill, raising funds, or running a business—Qosyne makes it easy.
                    </p>
                </section>

                {/* Features Section */}
                <section className="py-16  text-center">
                    <h2 className="text-3xl font-bold mb-12">Why Qosyne?</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                        <div className="bg-blue-800 p-6 shadow-lg rounded-xl">
                            <FaExchangeAlt className=" text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl  mb-2">Cross-Platform Transfers</h3>
                            <p className="">Send and receive money across multiple trusted platforms in real-time.</p>
                        </div>
                        <div className="bg-blue-800 p-6 shadow-lg rounded-xl">
                            <FaMoneyCheckAlt className=" text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl  mb-2">Minimal Fees</h3>
                            <p className="">Enjoy ultra-low transfer fees with every transaction.</p>
                        </div>
                        <div className="bg-blue-800 p-6 shadow-lg rounded-xl">
                            <FaShieldAlt className=" text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl  mb-2">Bank-Grade Security</h3>
                            <p className="">We protect your data and money with strong encryption and secure protocols.</p>
                        </div>
                        <div className="bg-blue-800 p-6 shadow-lg rounded-xl">
                            <FaMobileAlt className=" text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl  mb-2">Smart Notifications</h3>
                            <p className="">Track payments with real-time updates and an easy-to-read transaction history.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 ">
                    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
                    <form className="max-w-3xl mx-auto bg-blue-800 p-8 rounded-xl shadow-md space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className=" mb-2">Name</label>
                            <input type="text" id="name" className="outline-none rounded-lg p-3" placeholder="Your Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className=" mb-2">Email</label>
                            <input type="email" id="email" className="outline-none rounded-lg p-3" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="outline-none mb-2">Message</label>
                            <textarea id="message" rows="4" className=" rounded-lg p-3" placeholder="How can we help?" />
                        </div>
                        <button onClick={(e)=>e.preventDefault()} type="submit" className="w-full text-white py-3 rounded-lg bg-blue-900 transition">Send Message</button>
                    </form>
                </section>

                {/* Footer */}
                <footer className="text-center text-sm mt-10">
                    © {new Date().getFullYear()} Qosyne. All rights reserved.
                </footer>

            </div>

        </div>
    );
};

export default LandingPage;
