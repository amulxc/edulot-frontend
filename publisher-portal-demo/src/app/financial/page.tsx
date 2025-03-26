'use client';

import React, { useState } from 'react';
import Profile from '@/components/profile';
import ProgressBar from '@/components/progress_bar';
import { FaAngleRight } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const ResearchScoreForm = () => {
  const [selectedOption, setSelectedOption]: [string, (value: string) => void] = useState('');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === 'yes') {
      redirect('/financial-aid');
    } else if (value === 'no') {
      redirect('/research-score');
    }
  };

  return (
    <>
      <Profile />
      <ProgressBar progress={18} completed_steps={[1, 0, 0, 0, 0]} />
      <div className="p-6 w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6">
          <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
          Financial Aid
          </h1>
          <form className="w-full flex flex-col justify-between items-center">
            {/* Yes/No Checkbox Section */}
            <div className="w-full mb-4 flex flex-col justify-between items-center gap-4">
              <label className="text-white">Do You Need Financial Aid?</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="yes"
                    name="researchScore"
                    value="yes"
                    className="mr-2"
                    checked={selectedOption === 'yes'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="yes" className="text-white">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="no"
                    name="researchScore"
                    value="no"
                    className="mr-2"
                    checked={selectedOption === 'no'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="no" className="text-white">
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="w-full flex flex-row justify-end items-center mt-16">
              <Link href="/research-score">
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
  );
};

export default ResearchScoreForm;
