import React from 'react';

const CV: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)]">
      <object
        data={`${import.meta.env.BASE_URL}assets/cv.pdf`}
        type="application/pdf"
        className="w-full h-full rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center h-full bg-white dark:bg-primary-800 rounded-lg">
          <p className="text-primary-700 dark:text-primary-300">
            Unable to display PDF. Please{' '}
            <a 
              href={`${import.meta.env.BASE_URL}assets/cv.pdf`} 
              className="text-highlight hover:text-highlight-hover underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              download
            </a>{' '}
            instead.
          </p>
        </div>
      </object>
    </div>
  );
};

export default CV;