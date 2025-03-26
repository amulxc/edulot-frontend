"use client";
import { useState } from "react";
import Profile from "@/components/profile";
import ProgressBar from "@/components/progress_bar";
import InfoPopup from "@/components/info_popup"

const data = {
  "state": "Tamil Nadu",
  "city": "Chennai",
  "rankingType": "EngineeringRanking", //
  "researchScore": 1, //
  "theoryScore": 1,//
  
  "campusLifeScore": 1,
  "internationalExposureScore": 1,
  
  "placementRecordScore": 1,
  "academicScore": 1,
  "infrastructureScore": 1,
  "researchOpportunitiesScore": 1,
  "industryConnectionScore": 1,
  "costEffectivenessScore": 1,
  "influenceFactor": 1
}

export default function Home() {
  return (
    <>
      <Profile />
      <ProgressBar progress={1} completed_steps={[1,0,0,0,0]} />
      <InfoPopup />
    </>
  );
}
