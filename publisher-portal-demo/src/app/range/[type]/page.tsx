'use client';

import React, { useState, useEffect } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { ranges } from '@/components/constants/form_data';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Slider = () => {
    const params = useParams();
    const [value, setValue] = useState(5);
    const [currentObject, setCurrentObject] = useState<any>(null);

    useEffect(() => {
        if (params?.type === "salary_range") {
            setCurrentObject(ranges.salary_range);
        } else if (params?.type === "budget_range") {
            setCurrentObject(ranges.budget_range);
        }
    }, [params]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.target.value));
    };

    if (!currentObject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6">
                <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
                    {currentObject.title}
                </h1>
                <Image src={currentObject.image_url} alt="Campus Life Illustration" width={368} height={294} className='w-[200px] h-[200px] object-contain mb-6' />
                <div className="w-full mb-4 p-2 bg-white rounded-md flex flex-row justify-center items-center gap-2">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={value}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-300 rounded-full cursor-pointer"
                    />
                    <p className="text-black bg-gray-300 text-center mt-2 mb-[10px] p-[2px_15px] rounded-md font-[500]">{value}</p>
                    <span className="text-black text-center mt-2 mb-[10px] font-[600]">LPA</span>
                </div>
                <div className="w-full flex flex-row justify-end items-center mt-16">
                    <Link href={currentObject.next_link}>
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
    );
};

export default Slider;
