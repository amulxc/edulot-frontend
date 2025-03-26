import Profile from '@/components/profile';
import ProgressBar from '@/components/progress_bar';
import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import Link from 'next/link';


const InputForm = () => {
  return (
    <>
        <Profile />
        <ProgressBar progress={11} completed_steps={[1, 0, 0, 0, 0]} />
        <div className="p-6 w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6">
                <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
                    Entrance Exam & Score
                </h1>
                <form className="w-full flex flex-col justify-between items-center">
                    <select className="w-full h-[57px] rounded-lg p-4 shadow-md mb-4 text-gray-500">
                        <option value="">Enter Your Exam Score</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <input type="text" className="w-full h-[57px] bg-white rounded-lg p-4 shadow-md mb-4 text-gray-500" placeholder="Enter Your CGPA" />
                    <div className="w-full flex flex-row justify-end items-center mt-16">
                        <Link href="/form/entrance-exam">
                            <div className="flex flex-row justify-center items-center gap-2 w-[100px] h-[40px] bg-[#FFBD58] rounded-full p-2 shadow-md mb-4 text-gray-700 hover:bg-[#e6a84a] transition duration-300">
                                <span className="text-[16px] font-[600] text-black">Next</span>
                                <span className="w-[23px] h-[23px] text-[16px] font-[600] text-black bg-white rounded-full flex justify-center items-center font-bold">
                                    <FaAngleRight />
                                </span>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default InputForm;
