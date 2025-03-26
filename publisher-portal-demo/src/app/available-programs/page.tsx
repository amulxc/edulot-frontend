import React from 'react';
import Profile from '@/components/profile';
import ProgressBar from '@/components/progress_bar';
import { FaAngleRight } from "react-icons/fa";
import Link from 'next/link';


const programs = [
  "Bachelor of Technology (B.Tech) in Computer Science Engineering",
  "Bachelor of Engineering (B.E.) in Computer Science Engineering",
  "Integrated B.Tech + M.Tech in Computer Science",
];

const InputForm = () => {
  return (
    <>
      <Profile />

      <ProgressBar progress={35} completed_steps={[1, 1, 0, 0, 0]} />

      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="max-w-md w-full bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-white text-2xl font-semibold mb-10">
            Entrance Exam & Score
          </h1>

          <div className="w-full bg-white rounded-lg p-6 text-left">
            <h2 className="text-black text-lg font-semibold mb-2">
              Select Programs
            </h2>
            <ul className="list-decimal list-inside text-black">
              {programs.map((program, index) => (
                <li key={index} className="text-sm font-medium hover:cursor-pointer hover:bg-slate-400">
                  {program}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-row justify-end items-center mt-16">
              <Link href="/range/salary_range">
                  <div className="flex flex-row justify-center items-center gap-2 w-[100px] h-[40px] bg-[#FFBD58] rounded-full p-2 shadow-md mb-4 text-gray-700 hover:bg-[#e6a84a] transition duration-300">
                      <span className="text-[16px] font-[600] text-black">Next</span>
                      <span className="w-[23px] h-[23px] text-[16px] font-[600] text-black bg-white rounded-full flex justify-center items-center font-bold">
                          <FaAngleRight />
                      </span>
                  </div>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputForm;
