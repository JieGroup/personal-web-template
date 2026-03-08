import React, { useState } from 'react';
import { FileText, X, ExternalLink } from 'lucide-react';

interface Course {
  code: string;
  title: string;
  description: string;
  audience: string;
  years: string[];
  isNew?: boolean;
  nextOffering?: string;
  courseWebsite?: string;
  id?: string;
}

const Teaching: React.FC = () => {
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null);
  // Instead of a boolean, we store the URL of the website to preview
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);

  const courses: Course[] = [
    {
      code: 'STAT 8931',
      title: 'Generative AI',
      description: `Coverage: This course will equip students with broad view on the recent AI landscape. The course will delve into a variety of topics outlined below, ensuring that students grasp both the algorithmic underpinnings and practical implementations: 1) Foundations of Deep Learning and Generative AI, 2) Evolution of Language Modeling, 3) Unpacking Transformer Models, 4) Training LLMs from scratch, 5) Diffusion Models, 6) Efficiency in Foundation Models' Training and Finetuning, 7) Deployment Strategies for Foundation Models, 8) Ethical Considerations in Generative AI, and 9) Adversarial Learning in Generative AI.

I developed this course from scratch to provide students with an understanding of cutting-edge AI problems. Visit <link>https://your-course-website.example.com</link> for my open-source course materials.`,
      audience: 'Ph.D. students in Stat, EE, and CS',
      years: ['2024'],
      isNew: true,
      nextOffering: '2025',
      courseWebsite: 'https://your-course-website.example.com'
    },
    {
      code: 'PHY/AST/CSCI/STAT 8581',
      title: 'Big Data in Astrophysics',
      description: 'Coverage: This course will cover key concepts and techniques used in working with large datasets in the field of astrophysics. In the first four weeks, the focus will be on modern approaches to creating and manipulating large datasets, with an emphasis on time series analysis and Bayesian methods applied to astrophysics survey data. The remaining part of the course will delve into various machine learning techniques for data processing, including classification algorithms (supervised and unsupervised learning), clustering algorithms, regression problems, recommender systems, and graphical models. Each type of algorithm will be covered for around 2 weeks, with an initial introduction in 1-2 lectures and then team projects where students will apply the algorithms to astrophysical data sets in order to answer specific questions in astrophysics.',
      audience: 'mostly master-level graduate students and Ph.D. students in astrophysics, CS, and Stat',
      years: ['2024', '2023'],
      courseWebsite: 'https://github.com/mcoughlin/ast8581_2024_Spring'
    },
    {
      code: 'STAT 5021',
      title: 'Statistical Analysis',
      description: 'Coverage: 1) data description and basic probability, 2) random variables, 3) hypothesis tests and analysis of variance, 4) multiple regression and interpretations, 5) complex regressors, and 6) regression diagnostics.',
      audience: 'mostly master-level graduate students and some Ph.D. students from departments other than statistics',
      years: ['2024', '2023']
    },
    {
      code: 'STAT 8112',
      title: 'Mathematical Statistics II',
      description: 'Coverage: 1) different modes of convergence and their relationships, 2) when to swap limit and expectation, 3) martingale and its convergence, 4) central limit theorems under various conditions, 5) the Delta method, 6) U-statistics, 7) maximum likelihood estimation, M-estimators, and Z-estimators, 8) asymptotical analysis, 9) information criteria and general model selection, 10) basics of Bayesian, 11) Bayesian asymptotics in terms of consistency and Bernstein-von Mises theorem, and 12) various ways to hypothesis testing, power analysis.',
      audience: 'Ph.D. students in statistics',
      years: ['2022']
    },
    {
      code: 'STAT 4052',
      title: 'Introduction to Statistical Learning',
      description: 'Coverage: 1) linear regression, 2) logistic regression, 3) tree methods, 4) elements of deep learning, including feedforward and convolutional neural networks, recurrent neural networks, applications to object classification/detection and language modeling, 5) bias-var tradeoffs and model selection, 6) model diagnostics, 7) support vector machine, 8) margin-based classification, 9) k-means and model-based clustering methods, 10) PCA, sufficient dimension reduction, and deep autoencoders, 11) optimization methods such as GD, SGD, 12) various in-lab case studies.\nOptional material: 13) knowledge distillation, 14) adversarial learning, 15) computational frameworks such as Pytorch.',
      audience: 'undergraduate-level students who major in statistics',
      years: ['2021', '2018']
    },
    {
      code: 'STAT 5302',
      title: 'Applied Regression Analysis',
      description: 'Coverage: 1) multiple regression and interpretations, 2) complex regressors, 3) analysis of variance, 4) nonlinear transformations, 5) regression diagnostics, 6) and variable selection, 7) intro to statistical learning, and 8) deep learning techniques, including feedforward neural network, auto-encoder, convolutional neural network, recurrent neural network, stochastic gradient descent.',
      audience: 'mostly master-level graduate students and some Ph.D. students from departments other than statistics',
      years: ['2020', '2019']
    }
  ].sort((a, b) => Math.max(...b.years.map(Number)) - Math.max(...a.years.map(Number)));

  // Generate an 'id' for each course by replacing spaces with dashes
  courses.forEach(course => {
    course.id = course.title.replace(/\s+/g, '-');
  });

  // Renders any <link> tags in the text as clickable
  const renderDescription = (text: string) => {
    const parts = text.split('<link>');
    if (parts.length === 1) return text; // no <link> tag found

    const [beforeLink, linkAndAfter] = parts;
    const [linkUrl, afterLink = ''] = linkAndAfter.split('</link>');

    return (
      <>
        {beforeLink}
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-section-blue-light dark:text-section-blue-dark"
        >
          {linkUrl}
        </a>
        {afterLink}
      </>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6">Teaching</h2>
      
      <div className="space-y-6">
        {courses.map((course) => (
          <div 
            key={course.code}
            className={`bg-primary-50/50 dark:bg-primary-900/50 rounded-lg shadow-md overflow-hidden relative border border-primary-100 dark:border-primary-800 ${
              course.isNew ? 'ring-2 ring-section-amber-light dark:ring-section-amber-dark' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 truncate pr-4">
                  {course.code} - {course.title}
                </h3>
                {course.isNew && (
                  <span className="bg-section-amber-light/10 dark:bg-section-amber-dark/10 text-section-amber-light dark:text-section-amber-dark px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.years.map((year) => (
                  <span 
                    key={year}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-section-green-light/10 dark:bg-section-green-dark/10 text-section-green-light dark:text-section-green-dark"
                  >
                    {year}
                  </span>
                ))}
                {course.nextOffering && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-section-amber-light/10 dark:bg-section-amber-dark/10 text-section-amber-light dark:text-section-amber-dark">
                    {course.nextOffering}
                  </span>
                )}
              </div>
              
              <div className="bg-white/50 dark:bg-primary-800/50 rounded-lg p-4 space-y-4">
                <div>
                  <div className="text-section-blue-light dark:text-section-blue-dark font-medium mb-2">
                    Audience:
                  </div>
                  <div className="text-primary-800 dark:text-primary-200">
                    {course.audience}
                  </div>
                </div>

                <div>
                  <div className="text-section-purple-light dark:text-section-purple-dark font-medium mb-2">
                    Coverage:
                  </div>
                  <div className="text-primary-800 dark:text-primary-200">
                    {course.description.replace('Coverage: ', '').split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-2 last:mb-0">
                        {renderDescription(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* Hide View Syllabus for Big Data in Astrophysics */}
                  {course.title !== 'Big Data in Astrophysics' && (
                    <button
                      onClick={() => setSelectedSyllabus(course.id)} 
                      className="inline-flex items-center px-4 py-2 text-sm rounded-md bg-section-purple-light/10 dark:bg-section-purple-dark/10 text-section-purple-light dark:text-section-purple-dark hover:bg-section-purple-light/20 dark:hover:bg-section-purple-dark/20 transition-colors"
                    >
                      <FileText size={16} className="mr-2" />
                      Syllabus
                    </button>
                  )}

                  {/* Unified Course Website button */}
                  {course.courseWebsite && (
                    course.courseWebsite.includes('github.com') ? (
                      <a
                        href={course.courseWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm rounded-md bg-section-blue-light/10 dark:bg-section-blue-dark/10 text-section-blue-light dark:text-section-blue-dark hover:bg-section-blue-light/20 dark:hover:bg-section-blue-dark/20 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Course Website
                      </a>
                    ) : (
                      <button
                        onClick={() => setWebsiteUrl(course.courseWebsite)}
                        className="inline-flex items-center px-4 py-2 text-sm rounded-md bg-section-blue-light/10 dark:bg-section-blue-dark/10 text-section-blue-light dark:text-section-blue-dark hover:bg-section-blue-light/20 dark:hover:bg-section-blue-dark/20 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Course Website
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Modal */}
      {selectedSyllabus && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSyllabus(null)}
        >
          <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] relative">
            <div className="h-full p-1">
              <object
                data={`/assets/syllabi/${selectedSyllabus}.pdf`}
                type="application/pdf"
                className="w-full h-full rounded"
              >
                <p className="text-center p-4 text-primary-600 dark:text-primary-400">
                  Syllabus PDF not available
                </p>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* Website Preview Modal */}
      {websiteUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] relative">
            {/* Close button for the website preview */}
            <button
              onClick={() => setWebsiteUrl(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 dark:bg-primary-900/90 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors shadow-md"
            >
              <X size={20} className="text-primary-600 dark:text-primary-400" />
            </button>
            <iframe
              src={websiteUrl}
              className="w-full h-full rounded-lg"
              title="Course Website"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Teaching;
