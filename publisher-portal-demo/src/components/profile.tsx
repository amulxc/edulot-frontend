import React from 'react'
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full p-10">
        <div className="flex flex-row gap-4 w-full">
            <Image className="w-[50px] h-[50px] rounded-full mt-[4px]" src="/profile_images/unknown_profile.png" alt="profile" width={100} height={100} />            
            <div>
                <h1 className="text-2xl font-[600] text-[22px]">Hello,</h1>
                <p className="font-[400] text-[14px]">Raghul start your  journey</p>
            </div>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-[#FFD777] flex justify-center items-center p-2">
            <IoSearch className="text-1xl text-black text-[50px] font-thin" />
        </div>
    </div>
  )
}

export default Profile
