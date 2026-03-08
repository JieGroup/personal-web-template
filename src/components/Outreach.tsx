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
                At the University of Minnesota, [Your Name] leads a multi-year, interdisciplinary research initiative in collaboration with Cisco Research, focusing on developing safer and more reliable AI systems. This research effort brings together leading experts, including{' '}
                <a 
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Dr. [Collaborator A]
                </a>
                {' '}and{' '}
                <a 
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  Dr. [Collaborator B]
                </a>
                {' '}from UMN, alongside{' '}
                <span className="text-section-blue-light dark:text-section-blue-dark">Dr. [Industry Partner A]</span>
                {' '}and{' '}
                <span className="text-section-blue-light dark:text-section-blue-dark">Dr. [Industry Partner B]</span>
                {' '}at Cisco Research.
              </p>
              
              <p>
                Since 2021, our team has been working at the forefront of AI safety, tackling critical challenges such as backdoor and poisoning attacks, digital watermarking, and multi-agent system security. Our partnership with Cisco Research, highlighted in this{' '}
                <a 
                  href="https://example.com/press-release"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-blue-light hover:text-section-blue-light/80 dark:text-section-blue-dark dark:hover:text-section-blue-dark/80"
                >
                  press release
                </a>
                , reflects a shared commitment to advancing the field through cutting-edge research and industry collaboration.
              </p>

              <p>
                [Your Name] is always open to discussions with industry partners interested in translating research into practical solutions. If your company is exploring ways to enhance AI security, reliability, or robustness, I would love to connect and explore potential collaborations.
              </p>

              <div className="mt-8">
                <img 
                  src="https://placehold.co/800x450?text=Research+Partnership" 
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
                [Your Name] launched the project{' '}
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
                  href="https://example.com/outreach"
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
                  src="https://placehold.co/800x450?text=Outreach+Program" 
                  alt="UMN AEOP High School Program Team" 
                  className="w-full max-w-3xl mx-auto h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-primary-500 dark:text-primary-400 mt-2 text-center">
                  Pictured in the top row from left to right: Program director Program director [Your Name] and mentors. Pictured in the bottom row from left to right: program participants Avery Cheek, Anna Gye, Gunnar Kennedy, and Neha Reddy.
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