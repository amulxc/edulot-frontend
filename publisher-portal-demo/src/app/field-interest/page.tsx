'use client'

import Profile from '@/components/profile';
import ProgressBar from '@/components/progress_bar';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const FieldInterest = () => {
    const [rankings, setRankings] = useState<string[]>([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch('https://edulot-api.netlify.app/institute/ranking', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    mode: 'cors',  // This is the default, but being explicit
                    credentials: 'omit'  // Don't send credentials
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRankings(data);
            } catch (error) {
                console.error('Error fetching rankings:', error);
                // Fallback data in case the API fails
                setRankings([
                    "MedicalRanking",
                    "OverallRanking",
                    "ManagementRanking",
                    "UniversityRanking",
                    "InnovationRanking",
                    "CollegeRanking",
                    "EngineeringRanking",
                    "STATEPUBLICUNIVERSITYRanking",
                    "AgricultureRanking",
                    "SKILLUNIVERSITYRanking",
                    "DentalRanking",
                    "ArchitectureRanking",
                    "LawRanking",
                    "ResearchRanking",
                    "PharmacyRanking"
                ]);
            }
        };
        fetchRankings();
    }, []);

    const handleRankingSelect = (rankingType: string) => {
        let formData = localStorage.getItem('form_data');
        if (formData) {
            const parsedData = JSON.parse(formData);
            parsedData.rankingType = rankingType;
            localStorage.setItem('form_data', JSON.stringify(parsedData));
        } else {
            const newFormData = {
                rankingType: rankingType
            };
            localStorage.setItem('form_data', JSON.stringify(newFormData));
        }
    };

    return (
        <>
            <Profile />
            <ProgressBar progress={24} completed_steps={[1, 1, 0, 0, 0]} />
            <div className='w-full px-6 mt-12 flex flex-col justify-center items-center'>   
                <div className='w-full max-w-[400px] flex flex-col justify-center items-center p-6 bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6'>
                    <h1 className='text-[#FFFFFF] text-[24px] font-[600] text-center mb-6'>
                        Select Ranking Type
                    </h1>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        {rankings.map((ranking, index) => {
                            const displayName = ranking.replace('Ranking', '');
                            return (
                                <Link 
                                    key={index}
                                    href="/form/specialization" 
                                    className='w-full h-auto flex flex-col justify-between items-start bg-[#EEEEEE] rounded-lg p-4 shadow-md mb-4 gap-3 hover:bg-[#FFD777] cursor-pointer'
                                    onClick={() => handleRankingSelect(ranking)}
                                >
                                    <div className='w-full flex flex-col justify-between items-start'>
                                        <h1 className='text-[#000000] text-[13.33px] font-[500]'>
                                            {displayName}
                                        </h1>
                                        <p className='text-[#717171] text-[13.33px] font-[500]'>
                                            Ranking Type
                                        </p>
                                    </div>
                                    <div className='w-full h-[44px] rounded-full flex justify-end items-end p-2'>
                                        <img 
                                            src="https://www.pngmart.com/files/7/SEO-Transparent-Background.png" 
                                            alt={displayName} 
                                            className='w-[70%] h-fit object-cover' 
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FieldInterest;
