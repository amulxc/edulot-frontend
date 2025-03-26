'use client';
import Profile from '@/components/profile';
import ProgressBar from '@/components/progress_bar';
import React, { useState } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { redirect } from 'next/navigation';

const InputForm = () => {
  const [selectedOptions, setSelectedOptions]: [string[], (value: string[]) => void] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
    setSelectedOptions(options);
  };

  const handleNextClick = () => {
    redirect('/research-score');
  };

  return (
    <>
      <Profile />
      <ProgressBar progress={18} completed_steps={[1, 0, 0, 0, 0]} />
      <div className="p-6 w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6">
          <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
            Entrance Exam & Score
          </h1>
          <form className="w-full flex flex-col justify-between items-center">
            {/* Multi-select Input */}
            <select
              multiple
              className="w-full h-[150px] rounded-lg p-4 shadow-md mb-4 text-gray-500"
              value={selectedOptions}
              onChange={handleSelectChange}
            >
              <option value="Merit-Based Scholarship">Merit-Based Scholarship</option>
              <option value="Need-Based Scholarship">Need-Based Scholarship</option>
              <option value="Sports Scholarship">Sports Scholarship</option>
              <option value="Government Merit-Based Scholarship">Government Merit-Based Scholarship</option>
              <option value="Government Aid/Grants">Government Aid/Grants</option>
              <option value="Private Loans">Private Loans</option>
              <option value="Work-Study Programs">Work-Study Programs</option>
              <option value="Aid/Grants">Aid/Grants</option>
            </select>
            
            <div className="w-full flex flex-row justify-end items-center mt-16">
              <div
                onClick={handleNextClick}
                className="flex flex-row justify-center items-center gap-2 w-[100px] h-[40px] bg-[#FFBD58] rounded-full p-2 shadow-md mb-4 text-gray-700 hover:bg-[#e6a84a] transition duration-300 cursor-pointer"
              >
                <span className="text-[16px] font-[600] text-black">Next</span>
                <span className="w-[23px] h-[23px] text-[16px] font-[600] text-black bg-white rounded-full flex justify-center items-center font-bold">
                  <FaAngleRight />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
