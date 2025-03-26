"use client";

import "./globals.css";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileView, setIsMobileView] = useState(true); // Default to mobile view

  useEffect(() => {
    // Get saved view preference from localStorage
    const savedView = localStorage.getItem('viewMode');
    if (savedView !== null) {
      setIsMobileView(JSON.parse(savedView));
    }
  }, []);

  const toggleView = () => {
    const newView = !isMobileView;
    setIsMobileView(newView);
    localStorage.setItem('viewMode', JSON.stringify(newView));
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className="flex min-h-screen bg-black text-white w-full flex-col"
      >
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleView}
            className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
          >
            {isMobileView ? 'Desktop View' : 'Mobile View'}
          </button>
        </div>
        <div 
          className={`flex flex-col items-center min-h-screen w-full bg-contain bg-top bg-no-repeat px-4 md:px-0 transition-all duration-300`}
          style={{ 
            backgroundImage: "url('/background_particals/top.png')",
            maxWidth: isMobileView ? '430px' : '100%',
            margin: isMobileView ? '0 auto' : '0',
            border: isMobileView ? '2px solid #333' : 'none',
            borderRadius: isMobileView ? '20px' : '0',
            height: isMobileView ? '100vh' : 'auto',
            overflow: isMobileView ? 'auto' : 'visible'
          }}
        >
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
