import React from 'react';
import { GraduationCap, BookOpen, Users, Globe, Briefcase } from 'lucide-react';

interface Student {
  name: string;
  department: string;
  year: string;
  image?: string;
  thesis?: string;
  coAdvisor?: string;
  firstPosition?: string;
  researchTopics?: string[];
  degree?: string;
  homepage?: string;
}

const Students: React.FC = () => {
  const currentPhD: Student[] = [
    {
      name: 'Xun Xian',
      department: 'Electrical Engineering',
      year: '2020-Present',
      image: '/images/profile/students/xun-xian.png', // Updated to .png
      coAdvisor: 'Prof. Mingyi Hong',
      researchTopics: ['Deep Learning', 'AI Safety', 'Multi-Agent Systems'],
      homepage: 'https://jeremyxianx.github.io'
    },
    {
      name: 'Qi Le',
      department: 'Computer Science',
      year: '2020-Present',
      image: '/images/profile/students/qi-le.png',
      coAdvisor: 'Prof. Ali Anwar',
      researchTopics: ['Efficient LLM', 'Model Compression', 'Distributed Learning'],
      homepage: 'https://qi-le1.github.io/'
    },
    {
      name: 'Jiaying Zhou',
      department: 'Statistics',
      year: '2021-Present',
      image: '/images/profile/students/jiaying-zhou.png',
      coAdvisor: 'Prof. Yuhong Yang',
      researchTopics: ['Decentralized Learning', 'Data Privacy'],
      // homepage: 'https://www.linkedin.com/in/jiaying-zhou-9b4493161/'
      // Amazon, Applied Scientist
    },
    {
      name: 'Jin Du',
      department: 'Statistics',
      year: '2021-Present',
      image: '/images/profile/students/jin-du.png',
      coAdvisor: 'Prof. Yuhong Yang',
      researchTopics: ['Large Language Models', 'Lifelong Learning', 'AI Agents', 'Statistical Theory'],
    },
    {
      name: 'An Luo',
      department: 'Statistics',
      year: '2022-Present',
      image: '/images/profile/students/an-luo.png',
      researchTopics: ['Watermarking', 'AI Agents'],
      homepage: 'https://www.linkedin.com/in/an-luo-296868228/'
    },
    {
      name: 'Fangqiao Tian',
      department: 'Statistics',
      year: '2024-Present',
      image: '/images/profile/students/fangqiao-tian.png',
      researchTopics: ['AI safety', 'Multi-Agent AI']
    },
  ];

  const currentMS: Student[] = [
    {
      name: 'Harsh Hemant Shah',
      department: 'Statistics',
      year: '2024-Present',
      image: '/images/profile/students/harsh-shah.png',
      researchTopics: ['Multi-Agent AI', 'AI Agent']
    }
  ];

  const graduatedAlumni: Student[] = [
    {
      name: 'Ganghua Wang',
      department: 'Statistics',
      year: '2024',
      image: '/images/profile/students/ganghua-wang.png', // Updated to .png
      thesis: 'Trustworthy AI in the Modern Era: Theories and Applications',
      firstPosition: 'Postdoctoral Researcher in Data Science at the University of Chicago',
      coAdvisor: 'Prof. Yuhong Yang',
      degree: 'Ph.D.',
      researchTopics: ['Deep Learning', 'AI Safety', 'Model and Data Privacy', 'Statistical Theory'],
      homepage: 'https://ganghuawang.github.io'
    },
    {
      name: 'Jiawei Zhang',
      department: 'Statistics',
      year: '2023',
      image: '/images/profile/students/jiawei-zhang.png',
      thesis: 'Diagnostics, Cooperation, and Model Selection for Modern Machine Learning',
      firstPosition: 'Assistant Professor in Statistics at the University of Kentucky',
      coAdvisor: 'Prof. Yuhong Yang',
      degree: 'Ph.D.',
      researchTopics: ['Collaborative Learning', 'Model Selection', 'Model Diagnostics', 'Statistical Theory'],
      homepage: 'https://jiaweizhang.site'
    },
    {
      name: 'Minh Nguyen',
      department: 'Data Science',
      year: '2023',
      // firstPosition: 'Data Scientist at Amazon',
      degree: 'M.S.',
      researchTopics: ['Online Learning']
    },
    {
      name: 'Sarah Bianchi',
      department: 'Statistics',
      year: '2024',
      // firstPosition: 'Machine Learning Engineer at Google',
      degree: 'M.S.',
      researchTopics: ['Retrieval Augmented Generation']
    },
    {
      name: 'Yilin Hou',
      department: 'Statistics',
      year: '2020',
      image: '/images/profile/students/yilin-hou.png',
      firstPosition: 'Senior Quantitative Anlayst at TD Bank',
      degree: 'M.S.',
      researchTopics: ['Smooth Change Points'],
      homepage: 'https://www.linkedin.com/in/yilin-hou/'
    }
  ];

  const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
    return (
      <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-baseline gap-4 mb-4">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              {student.name}
            </h3>
            <div className="flex gap-2">
              {student.degree && (
                <span className="text-sm font-medium text-primary-900 dark:text-primary-100">
                  {student.degree}
                </span>
              )}
              <span className="text-sm text-primary-900 dark:text-primary-100">
                {student.department}
              </span>
              <span className="text-sm text-primary-900 dark:text-primary-100">
                {student.year}
              </span>
            </div>
          </div>
  
          {/* Vertical layout for image and information */}
          <div className="flex flex-col gap-4">
            {/* Image */}
            {student.image && (
              <div className="flex-shrink-0">
                <div className="w-[150px] h-[150px] overflow-hidden"> {/* Square shape */}
                  <img 
                    src={student.image} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
  
            {/* Information */}
            <div className="flex-grow">
              {student.researchTopics && (
                <div className="flex items-start gap-2">
                  <BookOpen size={16} className="flex-shrink-0 mt-0.5 text-section-blue-light dark:text-section-blue-dark" />
                  <div className="text-sm">
                    <span className="font-medium text-primary-700 dark:text-primary-300">Research topics: </span>
                    <span className="text-primary-600 dark:text-primary-400">{student.researchTopics.join(', ')}</span>
                  </div>
                </div>
              )}
              
              {student.coAdvisor && (
                <div className="flex items-start gap-2 mt-2">
                  <Users size={16} className="flex-shrink-0 mt-0.5 text-section-green-light dark:text-section-green-dark" />
                  <div className="text-sm">
                    <span className="font-medium text-primary-700 dark:text-primary-300">Co-advisor: </span>
                    <span className="text-primary-600 dark:text-primary-400">{student.coAdvisor}</span>
                  </div>
                </div>
              )}
              
              {student.thesis && (
                <div className="flex items-start gap-2 mt-2">
                  <GraduationCap size={16} className="flex-shrink-0 mt-0.5 text-section-purple-light dark:text-section-purple-dark" />
                  <div className="text-sm">
                    <span className="font-medium text-primary-700 dark:text-primary-300">Thesis: </span>
                    <span className="text-primary-600 dark:text-primary-400">{student.thesis}</span>
                  </div>
                </div>
              )}
              
              {student.firstPosition && (
                <div className="flex items-start gap-2 mt-2">
                  <Briefcase size={16} className="flex-shrink-0 mt-0.5 text-section-amber-light dark:text-section-amber-dark" />
                  <div className="text-sm">
                    <span className="font-medium text-primary-700 dark:text-primary-300">First Position: </span>
                    <span className="text-primary-600 dark:text-primary-400">{student.firstPosition}</span>
                  </div>
                </div>
              )}
              
              {student.homepage && (
                <div className="flex items-start gap-2 mt-2">
                  <Globe size={16} className="flex-shrink-0 mt-0.5 text-section-blue-light dark:text-section-blue-dark" />
                  <a 
                    href={student.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80 transition-colors"
                  >
                    Homepage
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-section-purple-light dark:text-section-purple-dark mb-6">
          Current PhD Students
        </h2>
        <div className="space-y-3">
          {currentPhD.map((student) => (
            <StudentCard key={student.name} student={student} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-section-blue-light dark:text-section-blue-dark mb-6">
          Current MS Students
        </h2>
        <div className="space-y-3">
          {currentMS.map((student) => (
            <StudentCard key={student.name} student={student} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-section-green-light dark:text-section-green-dark mb-6">
          Graduated Alumni
        </h2>
        <div className="space-y-3">
          {graduatedAlumni.map((student) => (
            <StudentCard key={student.name} student={student} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Students;