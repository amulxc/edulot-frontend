'use client';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

const ResearchScoreForm = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let getScore = localStorage.getItem('form_data');
    if (getScore) {
      const formData = JSON.parse(getScore);
      formData.researchScore = selectedOption === 'Research' ? 1 : 0;
      localStorage.setItem('form_data', JSON.stringify(formData));
    } else {
      const formData = {
        researchScore: selectedOption === 'Research' ? 1 : 0,
      };
      localStorage.setItem('form_data', JSON.stringify(formData));
    }
    console.log(localStorage.getItem('form_data'));
    redirect(`/get-score/${selectedOption.toLowerCase()}`);
  };

  return (
    <div className="p-6 w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6">
        <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
          Research or Industry Focus
        </h1>
        <form className="w-full flex flex-col justify-between items-center" onSubmit={handleSubmit}>
          <select
            className="w-full h-[57px] rounded-lg p-4 shadow-md mb-4 text-gray-500"
            value={selectedOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Research">Research</option>
            <option value="Industry">Industry focus</option>
          </select>
          <button
            type="submit"
            className="flex flex-row justify-center items-center gap-2 w-[100px] h-[40px] bg-[#FFBD58] rounded-full p-2 shadow-md mb-4 text-gray-700 hover:bg-[#e6a84a] transition duration-300"
          >
            <span className="text-[16px] font-[600] text-black">Next</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchScoreForm;
