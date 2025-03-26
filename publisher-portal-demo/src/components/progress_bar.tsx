import React from 'react';
import Image from 'next/image';

const ProgressBar = ({progress, completed_steps}: {progress: number, completed_steps: number[]}) => {
    let progress_data = (progress || 86);
    let fake_value: number[] =(completed_steps || [1,0,0,0,0]);
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4 p-1'>
        <div className='w-full flex flex-col justify-center items-center px-6'>
            <div className='w-full gap-3 flex flex-col justify-center items-start p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg bg-gradient-to-r from-[#1976d236] to-[#a855f747]'>
                <h1 className='text-white text-[16px] font-[600]'>{progress_data}% completed</h1>
                <div className='w-full h-[8.67px] bg-[#385682] rounded-full'>
                    <div className={`flex flex-row justify-end items-center h-[8.67px] bg-[#68FF6E] rounded-full`} style={{width: `${progress_data}%`}}>
                        <div className='w-[5px] h-[5px] bg-[#68FF6E] rounded-full shadow-[0px_0px_11px_7px_#68FF6E]'>

                        </div>
                    </div>
                </div>
                <p className='text-white text-[13px] font-[500]'>Your Dream College is Within Reach  Keep Going!</p>
            </div>
        </div>
        <div className='w-[90%] flex flex-row justify-between items-center gap-4 relative'>
            {
                Array.from(fake_value).map((_, index) => (
                    <div key={index} className={`relative w-[45px] h-[45px] border-[2.5px] rounded-full p-1 flex justify-center items-center z-10 bg-[#79797900] backdrop-blur-lg ${_ === 1 ? 'border-[#68FF6E]' : 'border-white'}`} >
                        <button
                            key={index}
                            className={`w-full h-full rounded-full font-bold text-black ${_ === 1 ? 'bg-[#FFBD58]' : 'bg-white'}`}
                        >
                            {index + 1}
                        </button>
                    </div>
                ))
            }
            <div className='absolute w-full h-[3px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-b-2 border-dashed border-white'></div>
            </div>
        </div>
  )
}

export default ProgressBar;
