import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Github, MessageSquare, Star } from 'lucide-react';
import { Foundation } from './ResearchTopics/Foundation';
import { MultiAgent } from './ResearchTopics/MultiAgent';
import { Safety } from './ResearchTopics/Safety';
import { Scalability } from './ResearchTopics/Scalability';
import { AgenticAI } from './ResearchTopics/AgenticAI';
import { Publication, PublicationCard } from './shared/PublicationCard';

export interface ResearchDirection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  questions: string[];
  publications: Publication[];
}

const Research: React.FC = () => {
  const [expandedDirections, setExpandedDirections] = useState<string[]>([]);

  const toggleDirection = (id: string) => {
    setExpandedDirections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const researchDirections: ResearchDirection[] = [
    AgenticAI,
    Foundation,
    Scalability,
    MultiAgent,
    Safety
  ];

  const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
    const parts = publication.venue.split(',');
    const mainVenue = parts[0].trim();
    const extras = parts.slice(1).map(s => s.trim());
    
    return (
      <div className="bg-white dark:bg-primary-800/50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-primary-200 dark:border-primary-700">
        <h4 className="font-medium text-primary-900 dark:text-white mb-2">
          {publication.title}
        </h4>
        <p className="text-sm text-primary-600 dark:text-white mb-3">
          {publication.authors.join(', ')}
        </p>
        <p className="text-sm mb-4 dark:text-white">
          <span className="font-semibold text-primary-600 dark:text-white">
            {mainVenue}
          </span>
          {extras.map((extra, idx) =>
            /oral presentation/i.test(extra) || /spotlight presentation/i.test(extra) ? (
              <span key={idx} className="ml-2 font-semibold text-primary-600 dark:text-white">
                {extra.charAt(0).toUpperCase() + extra.slice(1)}
              </span>
            ) : (
              <span key={idx} className="ml-2 text-primary-600 dark:text-white">
                {extra}
              </span>
            )
          )}
          <span>, {publication.year}</span>
        </p>
        
        <div className="flex space-x-3">
          <a
            href={publication.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1 rounded-md bg-section-purple-light/10 dark:bg-section-purple-dark/10 text-section-purple-light dark:text-section-purple-dark hover:bg-section-purple-light/20 dark:hover:bg-section-purple-dark/20 transition-colors text-sm ${publication.pdf === "#" ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FileText size={14} className="mr-1" />
            PDF
          </a>
          {publication.github !== "#" && (
            <a
              href={publication.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-md bg-section-green-light/10 dark:bg-section-green-dark/10 text-section-green-light dark:text-section-green-dark hover:bg-section-green-light/20 dark:hover:bg-section-green-dark/20 transition-colors text-sm"
            >
              <Github size={14} className="mr-1" />
              Code
            </a>
          )}
          {publication.chat && publication.chat.trim() !== "#" && (
            <a
              href={publication.chat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-md bg-section-blue-light/10 dark:bg-section-blue-dark/10 text-section-blue-light dark:text-section-blue-dark hover:bg-section-blue-light/20 dark:hover:bg-section-blue-dark/20 transition-colors text-sm"
            >
              <MessageSquare size={14} className="mr-1" />
              Chat
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6">Research Directions</h2>
      
      <div className="space-y-6">
        {researchDirections.map((direction) => (
          <div 
            key={direction.id} 
            className="bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden"
          >
            <div 
              className="cursor-pointer"
              onClick={() => toggleDirection(direction.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={direction.image} 
                  alt={direction.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{direction.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{direction.subtitle}</p>
                </div>
              </div>
              
              <div className="p-4 flex justify-between items-center border-t border-primary-200 dark:border-primary-700">
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  {expandedDirections.includes(direction.id) ? 'Hide details' : 'Show details'}
                </span>
                {expandedDirections.includes(direction.id) ? 
                  <ChevronUp className="text-primary-600 dark:text-primary-400" size={20} /> : 
                  <ChevronDown className="text-primary-600 dark:text-primary-400" size={20} />
                }
              </div>
            </div>
            
            {expandedDirections.includes(direction.id) && (
              <div className="p-6 space-y-8 border-t border-primary-200 dark:border-primary-700">
                <div className="bg-section-purple-light/5 dark:bg-section-purple-dark/5 rounded-xl p-6 border border-section-purple-light/20 dark:border-section-purple-dark/20">
                  <div className="prose dark:prose-invert max-w-none">
                    {direction.content.split('\n\n').map((paragraph, idx) => (
                      <p 
                        key={idx} 
                        className="text-primary-800 dark:text-primary-200"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                  {direction.questions.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {direction.questions.map((question, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star size={16} className="flex-none text-section-purple-light dark:text-section-purple-dark mr-2 mt-1" />
                          <span className="text-section-purple-light dark:text-section-purple-dark">{question}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <section>
                  <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
                    Representative Work
                  </h4>
                  <div className="grid gap-4">
                    {direction.publications.map((pub, idx) => (
                      <PublicationCard key={idx} publication={pub} />
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;