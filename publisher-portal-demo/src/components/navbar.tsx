"use client"

import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    let menu_items: { name: string, link: string }[] = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        }
    ];

    return (
        <div className="p-4 w-full sticky top-0 z-20 ">
            <div className="flex justify-between items-center w-full h-[79px] m-auto p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-md bg-gradient-to-r from-[#1976d236] to-[#a855f747]">
                <div>
                    <Image src="/logos/logo.png" alt="logo" width={100} height={100} className="h-[40px] w-[90px] mb-3" />
                </div>
                <a className="flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full"
                    onClick={() => setMenuVisible(!menuVisible)}
                >
                    <RiMenu4Fill className="text-[#FFBD58] text-3xl" />
                </a>
            </div>

            {/* Conditionally render the menu list */}
            {menuVisible && (
                <div
                    id="menu-list"
                    className="flex flex-col justify-between items-center w-full h-auto m-auto p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-md mt-2 transition-all duration-500 ease-in-out"
                >
                    {menu_items.map((item, index) => (
                        <a href={item.link} key={index} className="text-white text-lg font-bold hover:text-[#FFBD58] transition-all">
                            {item.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navbar;
