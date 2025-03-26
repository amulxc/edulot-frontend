'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const colors = ['#D30027', '#F87501', '#F8B300', '#89D421', '#44BC38'];

const questionData = [
  {
    key: "campusLifeScore",
    head: "How Important is Campus Life to You?",
    type: "camp",
    redirect: "/get-score/inter",
    image: 'https://s3-alpha-sig.figma.com/img/6e33/ef96/58dda19a5a0aa15ca10401a20ba3f6bf?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZoA4joKTIYlBB3e-ndKi8u0dL1EK0x16hy4nKKOFG73JBvzI~GhZJcpenmkLh0lNxo3EuRNE44IeFallz3aJij5u3N-XDakIRDxXwUHlatxmJRUTQaDatWsiDC0hpRnaSTsgkilOYENsB8m4yDPtlSmX9SeNBRns39hnm5vGt1X6xMB713bIyZFfRF4qNGA8jN-pfj8aB0CCdshQ2SVAXjpQzzZBZ8cIU0oHHSZtodnecFMW6ofqEdVCJBuq3B50uKOleErjtTy1MZCIiJyj91fDAWXnlrLo37v~NwBAlXZLjcTK1EsELEMWA86ApjTNjVYQXI0HjwoZ~F4L5NDSFg__'
  },
  {
    key: "internationalExposureScore",
    head: "How important is global experience in your education?",
    type: "inter",
    redirect: "/multiselect",
    image: 'https://s3-alpha-sig.figma.com/img/4ec7/844a/2b57bf5c1404166a0cd685a2c869e7cf?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HOzRSp6RXJcMsxWXZen2ZXYCxZ5a~pR5lR~ea8uCTkZ6sr8S6t6apWR-1F9~8EQC8AhGCkGh8FiScbXclGBK5TpB4g97aRKIpT91QifT8kpZvvQzMVb-clsdq2MbO3AABXfHogrjBuFKQA4krrt9TKLdGOa6pjC4WweirI7-s5PEq~FZ5RcN~Xdh7LD35KEI3dz0mYhk011X4qfDfk-JkCfwffvtklbHW2t-Mn8getvJgLmGgTlVOaoSundbOj7gA3~cfCEOQs~WEpqSI3mLIC98S5AX-aj2pOIZ8MYRLSVgEHIsWmtGWLuHS2-A8gmn4po2d88pVejAv3mddUp9tw__'
  },
  {
    key: "researchScore",
    head: "How crucial is research involvement in your education?",
    type: "research",
    redirect: "/theory-score",
    image: 'https://static.vecteezy.com/system/resources/previews/003/857/417/large_2x/people-working-in-the-office-free-vector.jpg'
  },
  {
    key: "researchScore",
    head: "How crucial is Industry involvement in your education?",
    type: "industry",
    redirect: "/theory-score",
    image: 'https://static.vecteezy.com/system/resources/previews/003/857/417/large_2x/people-working-in-the-office-free-vector.jpg'
  },
  {
    key: "theoryScore",
    head: "How important is hands-on experience in your education?",
    type: "theory",
    redirect: "/get-score/camp",
    image: 'https://cdn.dribbble.com/users/1170793/screenshots/5996967/work_pack_white-01_4x.png'
  },
  {
    key: "theoryScore",
    head: "How important is hands-on experience in practical way of your education?",
    type: "practical",
    redirect: "/get-score/camp",
    image: 'https://cdn.dribbble.com/users/1170793/screenshots/5996967/work_pack_white-01_4x.png'
  },
];

const GetScore = ({ params }: { params: any }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const unwrappedParams = await params;
      const foundQuestion = questionData.find(q => q.type === unwrappedParams.page_id);
      
      if (!foundQuestion) {
        console.error("Invalid question type provided");
        return;
      }

      setCurrentQuestion(foundQuestion);
      setRedirectPath(foundQuestion.redirect);
    })();
  }, [params]);

  const handleSelect = (e: React.MouseEvent<HTMLElement>, score: number) => {
    e.preventDefault();

    if (selectedScore !== null) return;

    if (currentQuestion) {
      const formData = JSON.parse(localStorage.getItem('form_data') || '{}');

      let adjustedScore = score;
      if (currentQuestion.type === 'industry' || currentQuestion.type === 'practical') {
        adjustedScore = score - 1;
      }

      const updatedData = {
        ...formData,
        [currentQuestion.key]: adjustedScore
      };

      localStorage.setItem('form_data', JSON.stringify(updatedData));
      setSelectedScore(score);

      console.log(updatedData);

      setTimeout(() => {
        redirect(redirectPath || "/multiselect");
      }, 500);
    }
  };

  if (!currentQuestion) {
    return <div className="text-white text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center p-6 bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-white text-2xl font-semibold text-center mb-10">
          {currentQuestion.head}
        </h1>

        <Image 
          src={currentQuestion.image || ""}
          alt="Question Illustration"
          width={200}
          height={200}
          className="mb-6 object-contain"
        />

        <div className="flex gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-10 h-10 rounded text-white font-bold transition-all duration-300"
              style={{
                backgroundColor:
                  selectedScore !== null
                    ? selectedScore === index + 1
                      ? color
                      : '#9ca3af'
                    : hoverIndex !== null && index <= hoverIndex
                    ? colors[index]
                    : '#9ca3af',
              }}
              onClick={(e) => handleSelect(e, index + 1)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              disabled={selectedScore !== null}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetScore;
