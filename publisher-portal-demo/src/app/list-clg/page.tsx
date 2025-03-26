'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Institute {
  institute: {
    institute: {
      name: string;
      website: string;
      city: string;
      state: string;
    };
    institute_nirf_data: {
      tlr: number;
      rp: number;
      go: number;
      oi: number;
    };
  };
  score: number;
}

export default function RankingResults() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const stored_data = JSON.parse(localStorage.getItem('form_data') || '{}');
        let payload = {
          state: stored_data.state || "Tamil Nadu",
          city: stored_data.city || "Chennai",
          rankingType: stored_data.rankingType || "EngineeringRanking",
          researchScore: stored_data.researchScore || 1,
          theoryScore: stored_data.Theory || 1,
          campusLifeScore: stored_data.campusLifeScore || 1,
          internationalExposureScore: 1 ||stored_data.internationalExposureScore || 1,
          placementRecordScore: stored_data.placementRecordScore || 1,
          academicScore: stored_data.academicScore || 1,
          infrastructureScore: stored_data.infrastructureScore || 1,
          researchOpportunitiesScore: stored_data.researchOpportunitiesScore || 0,
          industryConnectionScore: stored_data.industryConnectionScore || 0,
          costEffectivenessScore: stored_data.costEffectivenessScore || 0,
          influenceFactor: stored_data.influenceFactor || 0
        }
        console.log(payload);

        const response = await fetch(`http://127.0.0.1:5000/rank_colleges`, {
        // const response = await fetch(`https://edulot-api.netlify.app/ranker`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }

        const data = await response.json();
        setInstitutes(data);
      } catch (err) {
        setError('Failed to fetch rankings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">College Rankings</h1>
        <p className="text-center text-gray-600 mb-8">Based on your preferences and requirements</p>
        
        <div className="grid gap-8">
          {institutes.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-700 hover:text-blue-800">
                    {item.institute.institute.name}
                  </h2>
                  <p className="text-gray-600 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.institute.institute.city}, {item.institute.institute.state}
                  </p>
                </div>
                <div className="md:text-right bg-blue-50 px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">
                    {item.score.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-blue-600">Overall Score</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Teaching & Learning', value: item.institute.institute_nirf_data.tlr, key: 'TLR' },
                  { label: 'Research & Professional Practice', value: item.institute.institute_nirf_data.rp, key: 'RP' },
                  { label: 'Graduation Outcomes', value: item.institute.institute_nirf_data.go, key: 'GO' },
                  { label: 'Outreach & Inclusivity', value: item.institute.institute_nirf_data.oi, key: 'OI' },
                ].map((metric) => (
                  <div key={metric.key} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="text-sm font-medium text-gray-600">{metric.key}</div>
                    <div className="text-xl font-bold text-gray-800 mt-1">{metric.value.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Link 
                  href={item.institute.institute.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
