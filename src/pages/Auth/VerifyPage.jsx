import React, { useState } from 'react';
import AuthImage from '../../assets/auth/auth.png';
import Logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import toast from 'react-hot-toast';
import axios from 'axios';

const VerifyPage = () => {

    const nav = useNavigate()
    const [formData, setFormData] = useState({ email: localStorage.getItem("uEmail"), otp: '', });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVerifyOtp = async () => {
        let loader = toast.loading("Processing")
        try {
            const response = await axios.post(`${config.baseUrl}/account/verify/otp`, formData);
            if (response?.data) {
                toast.dismiss(loader)
                localStorage.setItem("uId", response?.data?.data?._id)
                toast.success('Account verified!');
                setTimeout(() => { nav("/dashboard/home") }, 2000);
            }
        }
        catch (error) {
            toast.dismiss(loader)
            if (error.response) {
                toast.error(error?.response?.data?.msg || 'Login failed. Please try again.');
            }
            else if (error.request) {
                toast.error('No response received from the server. Please try again.');
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
    const handleResendOtp = async () => {
        let loader = toast.loading("Processing")
        try {
            const response = await axios.post(`${config.baseUrl}/account/send/otp/${localStorage.getItem("uEmail")}`, formData);
            if (response?.data) {
                toast.dismiss(loader)
                localStorage.setItem("uId", response?.data?.data?._id)
                toast.success('Otp Send successful!');
            }
        }
        catch (error) {
            toast.dismiss(loader)
            if (error.response) {
                toast.error(error?.response?.data?.msg || 'Otp Sending failed. Please try again.');
            }
            else if (error.request) {
                toast.error('No response received from the server. Please try again.');
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen'>

            <div className='flex justify-center items-center w-screen h-screen'>
                <div className='flex-1 hidden md:flex flex-col h-[100%] bg-[#F3FDFF]'>
                    <div className="flex-shrink-0 flex items-center gap-x-2 p-5">
                        <img src={Logo} alt="" className='h-10' />
                        <span className="text-xl">QOSYNE</span>
                    </div>
                    <div className='flex-1 h-[90%]'>
                        <img src={AuthImage} alt="" className='h-[100%]' />
                    </div>
                </div>

                <div className='flex-1 flex justify-center items-center flex-col h-[100%] overflow-y-auto pt-[25rem] md:pt-0'>
                    <div className='w-full max-w-md p-6'>
                        <h2 className="text-2xl mb-4 text-[#324B50]">OTP Verification</h2>
                        <p className='text-sm text-[#324B50]'>Check your email to see the verification code</p>
                        <form className="">
                            <input required={true} type="text" name="otp" placeholder="Otp" className="w-[100%] mt-2 border p-2 rounded outline-none block" onChange={handleChange} />
                        </form>
                        <p onClick={handleResendOtp} className="mt-2 text-[#3D8977] cursor-pointer">Resend Otp</p>
                        <button className="w-full bg-[#9FE7F5] p-2 rounded mt-4" onClick={handleVerifyOtp}>Verify</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VerifyPage