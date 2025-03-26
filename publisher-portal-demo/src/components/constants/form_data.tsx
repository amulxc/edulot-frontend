import { FaGraduationCap, FaAppleAlt } from 'react-icons/fa'; // Import multiple icons for dynamic rendering

const current_grade = [
  {
    title: 'Current Grade',
    options: [
      {
        icon: <FaGraduationCap className="text-[50px] text-[#FFFFFF]" />,
        name: 'Graduate',
        next_link: '/form/graduate'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: '12th Grade ',
        next_link: '/form/stream'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: '11th Grade',
        next_link: '/form/stream'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: '10th Grade Below ',
        next_link: '/form/stream10'
      },
    ],
  },
];

const graduate = [
    {
      title: 'Select Your Education Level',
      options: [
        {
          icon: <FaGraduationCap className="text-[50px] text-[#FFFFFF]" />,
          name: 'Undergraduate (UG) ',
          next_link: '/form/entrance-exam'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Postgraduate (PG)',
          next_link: '/form/entrance-exam'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Diploma',
          next_link: '/form/entrance-exam'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Doctorate (PhD)',
          next_link: '/form/entrance-exam'
        },
      ],
    },
];


const entrance_exam = [
    {
      title: 'Entrance Exams',
      options: [
        {
          icon: <FaGraduationCap className="text-[50px] text-[#FFFFFF]" />,
          name: 'Engineering ',
          next_link: '/exam-score'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Medical',
          next_link: '/exam-score'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Law',
          next_link: '/exam-score'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Design and Architecture',
          next_link: '/exam-score'
        },
      ],
    },
];


const stream = [
  {
    title: 'Stream',
    options: [
      {
        icon: <FaGraduationCap className="text-[50px] text-[#FFFFFF]" />,
        name: 'Science',
        next_link: '/education-board'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: 'Commerce',
        next_link: '/education-board'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: 'Arts & Humanities',
        next_link: '/education-board'
      },
      {
        icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
        name: 'Vocational',
        next_link: '/education-board'
      },
    ],
  },
];

const specialization = [
    {
      title: 'Choose Your Specialization Preference',
      options: [
        {
          icon: <FaGraduationCap className="text-[50px] text-[#FFFFFF]" />,
          name: 'Civil',
          next_link: '/available-programs'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Mechanical',
          next_link: '/available-programs'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Electrical',
          next_link: '/available-programs'
        },
        {
          icon: <FaAppleAlt className="text-[50px] text-[#FFFFFF]" />,
          name: 'Computer Science',
          next_link: '/available-programs'
        },
      ],
    },
  ];

const field_of_interest = [
    {
        name: 'Engineering',
        icon: 'https://www.pngmart.com/files/7/SEO-Transparent-Background.png',
        courses: 28
    },
    {
        name: 'Science',
        icon: 'https://www.pngmart.com/files/7/SEO-Transparent-Background.png',
        courses: 28
    },   
]

const ranges = {
    salary_range: {
      title: "What is Your Target Salary Range?",
      image_url: "https://static.vecteezy.com/system/resources/previews/000/486/174/original/isometric-artificial-intelligence-vector-illustration.jpg",
      next_link:  '/range/budget_range'
    },
    budget_range: {
      title: "What is Your Budget Range for the Total Course?",
      image_url: "https://skyaitechnologies.com/wp-content/uploads/2022/10/kindpng_7129972-1024x703.png",
      next_link:  '/location'
    }
} 



// Export named variables
export { current_grade, graduate, stream, entrance_exam, specialization, field_of_interest, ranges };
