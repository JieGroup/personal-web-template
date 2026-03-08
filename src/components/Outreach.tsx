import React, { useState } from 'react';

const Outreach: React.FC = () => {
  const [activeTab, setActiveTab] = useState('industry');

  const tabs = [
    { id: 'industry', label: 'Industry Engagement' },
    { id: 'highschool', label: 'High School Outreach' }
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 dark:border-primary-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-300'
                  : 'border-transparent text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'industry' && (
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-6 text-primary-800 dark:text-primary-200">
              <p>
                At the University of Minnesota, I lead a multi-year, interdisciplinary research initiative in collaboration with Cisco Research, focusing on developing safer and more reliable AI systems. This research effort brings together leading experts, including{' '}
                <a 
                  href="https://sites.google.com/site/xuanbigts/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Dr. Xuan Bi
                </a>
                {' '}and{' '}
                <a 
                  href="https://people.ece.umn.edu/~mhong/mingyi.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Dr. Mingyi Hong
                </a>
                {' '}from UMN, alongside{' '}
                <span className="text-section-blue-light dark:text-section-blue-dark">Dr. Jayanth Srinivasa</span>
                {' '}and{' '}
                <span className="text-section-blue-light dark:text-section-blue-dark">Dr. Ashish Kundu</span>
                {' '}at Cisco Research.
              </p>
              
              <p>
                Since 2021, our team has been working at the forefront of AI safety, tackling critical challenges such as backdoor and poisoning attacks, digital watermarking, and multi-agent system security. Our partnership with Cisco Research, highlighted in this{' '}
                <a 
                  href="https://research.umn.edu/units/techcomm/news/combining-academic-and-industry-research-modes-advance-machine-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  press release
                </a>
                , reflects a shared commitment to advancing the field through cutting-edge research and industry collaboration.
              </p>

              <p>
                I am always open to discussions with industry partners interested in translating research into practical solutions. If your company is exploring ways to enhance AI security, reliability, or robustness, I would love to connect and explore potential collaborations.
              </p>

              <div className="mt-8">
                <img 
                  src="https://research.umn.edu/sites/research.umn.edu/files/2024-04/1_cisco%20UMN%20partnership%20header%201280x720.jpg" 
                  alt="UMN-Cisco Research Partnership" 
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-primary-500 dark:text-primary-400 mt-2 text-center">
                  University of Minnesota and Cisco Research Partnership in Machine Learning
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'highschool' && (
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-4 text-primary-800 dark:text-primary-200">
              <p>
                I launched the project{' '}
                <span className="font-semibold">"A Journey of AI Research: Understanding and Exploring Supervised Learning"</span>
                {' '}to promote K-12 STEM education. Thanks to the financial sponsorship from the{' '}
                <a 
                  href="https://www.usaeop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Army's Educational Outreach Program (AEOP)
                </a>
                , this High School Apprenticeship program provides students with hands-on research experience at the University of Minnesota, while also offering valuable mentoring opportunities for our graduate students.{' '}
                <a 
                  href="https://cla.umn.edu/statistics/news-events/news/promoting-k-12-stem-education-armys-educational-outreach-program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Read more
                </a>
                {' '}about this initiative.
              </p>
              
              <div className="mt-6">
                <img 
                  src="https://cla.umn.edu/sites/cla.umn.edu/files/styles/feature_slider_image_style/public/UMN%20AEOP%20Collab%20.png?itok=J1EP0MPT" 
                  alt="UMN AEOP High School Program Team" 
                  className="w-full max-w-3xl mx-auto h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-primary-500 dark:text-primary-400 mt-2 text-center">
                  Pictured in the top row from left to right: Program director Jie Ding, program mentors Ganghua Wang, Jiawei Zhang, and Jiaying Zhou. Pictured in the bottom row from left to right: program participants Avery Cheek, Anna Gye, Gunnar Kennedy, and Neha Reddy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Outreach;