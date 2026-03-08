import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, BookOpen, Video } from 'lucide-react';
import { PublicationCard } from './shared/PublicationCard';
import { Safety } from './ResearchTopics/Safety';
import { Foundation } from './ResearchTopics/Foundation';
import { MultiAgent } from './ResearchTopics/MultiAgent';
import { Scalability } from './ResearchTopics/Scalability';
import { AgenticAI } from './ResearchTopics/AgenticAI';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Get featured publications from all research topics
  const featuredPublications = [
    ...Safety.publications.filter(p => p.featured),
    ...Foundation.publications.filter(p => p.featured),
    ...MultiAgent.publications.filter(p => p.featured),
    ...Scalability.publications.filter(p => p.featured),
    ...AgenticAI.publications.filter(p => p.featured),
  ].slice(0, 5); // Show only the first 5 featured publications

  // If no publications are marked as featured, use the most recent ones
  const recentPublications = featuredPublications.length > 0 ? featuredPublications : [
    Safety.publications[0], // MAP paper
    Safety.publications[1], // RAG paper
    MultiAgent.publications[0], // Assisted Learning paper
  ];

  const awards = [
    { 
      title: 'NSF CAREER Award',
      period: { start: '2024', end: null }
    },
    { 
      title: 'Army Early Career Program (Young Investigator) Award',
      period: { start: '2023', end: null }
    },
    { 
      title: 'Cisco Research Award',
      period: { start: '2022', end: '2025' }
    },
    { 
      title: 'AWS Cloud Credits for Research',
      period: { start: '2021', end: '2022' }
    },
    { 
      title: 'Meta/Facebook Faculty Research Award',
      period: { start: '2021', end: '2022' }
    },
    { 
      title: 'UMN Thank-A-Teacher Teaching Award',
      period: { start: '2019', end: '2020' }
    }
  ];

  const formatPeriod = (period: { start: string, end: string | null }) => {
    if (!period.end) return period.start;
    if (period.start.substring(0, 2) === period.end.substring(0, 2)) {
      return `${period.start}-${period.end.substring(2)}`;
    }
    return `${period.start}-${period.end}`;
  };

  const sponsorSizes: Record<string, string> = {
    NSF: '100px',
    ARO: '90px',
    ONR: '90px',
    NIH: '90px',
    DARPA: '90px',
    CISCO: '90px',
    AMAZON: '80px',
    META: '80px',
  };

  return (
    <div className="space-y-12">
      {/* Biography Section */}
      <section className="bg-white dark:bg-primary-700/30 rounded-xl p-8">
        <h2 className="section-title section-title-biography">Biography</h2>
        <div className="space-y-4 text-primary-800 dark:text-primary-200">
          <p>
            I am an Associate Professor at the <span className="highlight">School of Statistics, University of Minnesota</span>, 
            with graduate faculty appointments in <span className="highlight">Electrical Engineering</span> and 
            <span className="highlight"> Computer Science</span>, the <span className="highlight">Data Science Program</span>, 
            and is a core faculty member of the <a 
              href="https://dsai-hub.umn.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="highlight hover:opacity-80 transition-opacity"
            >Data Science and AI Hub</a>. 
            I was honored to be an Amazon Scholar with the Amazon AGI Team, focusing on foundation model training and post-training techniques. Additionally, I am a cofounder of <a 
              href="https://morphmind.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="highlight hover:opacity-80 transition-opacity"
            >MorphMind</a>, an AI platform to automate R&D workflows for domain professionals.
          </p>
          <p>
            I developed a new course <strong>STAT 8931 - Generative AI</strong>, including both theoretical and hands-on experience 
            in large language model training and deployment, for PhD students in Stat, EE, and CS. 
            Visit <a
              href="https://genai-course.jding.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >https://genai-course.jding.org</a> for my open-source course materials.
          </p>
            
          <p>
            My research is at the intersection of artificial intelligence, statistics, and scientific computing. I joined the University of Minnesota in September 2018 and got early tenure promotion in September 2023. Before that, I received a Ph.D. in Engineering Sciences from <span className="highlight">Harvard University</span> in 2017 and worked as a post-doctoral fellow at <span className="highlight">Duke University</span> in 2018. I obtained a B.S. degree from <span className="highlight">Tsinghua University</span>, where I was selected in the Math &amp; Physics Academic Talent Program (2008-2010) and also enrolled in the Electrical Engineering program (2010-2012).
          </p>
        </div>
      </section>

      {/* Research Interests Section */}
      <section className="bg-white dark:bg-primary-700/30 rounded-xl p-8">
        <h2 className="section-title section-title-research">Research Interests</h2>
        <div className="space-y-4 text-primary-800 dark:text-primary-200">
          <p>
            I like to formulate and address novel research problems that are often inspired by foundational thoughts in statistics, information theory, signal processing, and optimization. I address those research problems often by establishing new mathematical models, using asymptotic statistics and probability theory, and performing real-world data studies.
          </p>
          <p>
            As AI rapidly transitions from research labs to a broad spectrum of disciplines and industries, my research focuses on the following interconnected directions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold text-section-purple-light dark:text-section-purple-dark">
                Agentic AI
              </span> to develop autonomous AI agents that can plan, reason, and execute complex data science workflows while maintaining human oversight;
            </li>
              {/* Demo Video Button */}
              {/* <div className="flex justify-center my-6">
                <button
                  onClick={() => window.open('/media/ai-agent-demo1.mp4', '_blank')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all hover:shadow-lg"
                >
                  <Video size={20} />
                  <span>Demo Video</span>
                </button>
              </div> */}
            <li>
              <span className="font-bold text-section-purple-light dark:text-section-purple-dark">
                AI Foundations
              </span> to unravel fundamental principles to augment the interpretability and trustworthiness of data-driven decisions;
            </li>
            <li>
              <span className="font-bold text-section-purple-light dark:text-section-purple-dark">
                Scalable Modeling
              </span> to make AI more scalable and accessible to the general public;
            </li>
            <li>
              <span className="font-bold text-section-purple-light dark:text-section-purple-dark">
                Decentralized and Collaborative AI
              </span> to transcend the limitations of single-machine capabilities by catalyzing machine-to-machine interactions across networks;
            </li>
            <li>
              <span className="font-bold text-section-purple-light dark:text-section-purple-dark">
                AI Safety
              </span> to address emerging societal concerns related to privacy, security, and watermarking in the training and deployment of AI models.
            </li>
          </ul>
          <div className="flex flex-col space-y-4 mt-6">
            <button
              onClick={() => {
                navigate('/research');
                scrollToTop();
              }}
              className="inline-flex items-center text-sm text-section-purple-light dark:text-section-purple-dark hover:text-section-purple-light/80 dark:hover:text-section-purple-dark/80 transition-colors group w-fit"
            >
              <BookOpen size={18} className="mr-2" />
              Read More About My Research
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-4">
              <button
                onClick={() => {
                  const form = document.getElementById('interest-form');
                  if (form) {
                    form.classList.toggle('hidden');
                  }
                }}
                className="inline-flex items-center text-sm text-section-purple-light dark:text-section-purple-dark hover:text-section-purple-light/80 dark:hover:text-section-purple-dark/80 transition-colors group w-fit"
              >
                <UserPlus size={18} className="mr-2" />
                Interested in Working Together?
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <div id="interest-form" className="hidden mt-4 p-6 bg-white/50 dark:bg-primary-700/20 rounded-lg border border-primary-200 dark:border-primary-700">
                <h4 className="text-lg font-semibold text-section-purple-light dark:text-section-purple-dark mb-4">
                  Expression of Interest
                </h4>
                <p className="text-sm text-primary-700 dark:text-primary-300 mb-4">
                  Interested in joining my research group or pursuing a PhD at UMN? Please email me with:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm text-primary-700 dark:text-primary-300">
                  <li>Your full name</li>
                  <li>Your email address</li>
                  <li>A brief description of your special expertise and research interests</li>
                  <li>Your CV attached</li>
                </ol>
                <p className="mt-4 text-sm text-primary-700 dark:text-primary-300">
                  I will do my best to review and get back to you.
                </p>
              </div>
            </div>
          </div>

          {/* Agentic AI for Data Science Section */}
          <div className="mt-8 pt-8 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10 dark:bg-orange-400/10">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                Agentic AI for Data Science
              </h3>
            </div>
            
            <div className="space-y-4 text-primary-800 dark:text-primary-200">
              <p className="italic">
                Rethinking automation, with humans still in the loop.
              </p>
              <p>
                As AI tools become increasingly agentic—capable of autonomously planning and executing complex data science workflows—the boundary between what AI can automate and what still requires human expertise is rapidly evolving.
              </p>
              <p>
                In collaboration with colleagues at the University of Minnesota and partners across Minnesota's industry sectors, I lead the <span className="text-section-blue-light dark:text-section-blue-dark">Agentic AI for Data Science Benchmark</span>—a statewide initiative to rigorously evaluate the capabilities and limitations of agent-based AI systems in domain-specific data science tasks. Spanning areas such as healthcare, insurance, retail, energy, and beyond, this benchmark aims to identify where AI excels, where it falls short, and how domain expertise can bridge the gap.
              </p>
              
              <div className="flex items-center space-x-4 mt-6">
                <a
                  href="https://agentds.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 dark:hover:bg-orange-400/20 transition-colors"
                >
                  <span className="mr-2">🔗</span>
                  Visit AgentDS.org
                </a>
                <div className="flex items-center space-x-3 text-2xl">
                  <span title="Healthcare">🏥</span>
                  <span title="Insurance">📊</span>
                  <span title="Manufacturing">🏭</span>
                  <span title="Retail">🛒</span>
                  <span title="Data Science">📈</span>
                  <span title="AI">🤖</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Publications */}
          <div className="mt-8 pt-8 border-t border-primary-200 dark:border-primary-700">
            <h3 className="text-xl font-semibold text-section-purple-light dark:text-section-purple-dark mb-4">
              Latest Work
            </h3>
            <div className="space-y-4">
              {recentPublications.map((publication, index) => (
                <PublicationCard key={index} publication={publication} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Honors & Recognition Section */}
      <section className="bg-white dark:bg-primary-700/30 rounded-xl p-8">
        <h2 className="section-title section-title-honors">Honors & Recognition</h2>
        <div className="space-y-2">
          {awards.map((award, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-mono text-primary-700 dark:text-primary-300">{award.title}</span>
              <span className="px-3 py-1 rounded-full bg-section-green-light/10 dark:bg-section-green-dark/10 text-section-green-light dark:text-section-green-dark text-xs font-mono">
                {formatPeriod(award.period)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Acknowledgements Section */}
      <section
        className="
          rounded-xl
          p-8
          bg-section-amber-light/5 
          border border-section-amber-light/20
          dark:bg-white/10
          dark:border-white/20
        "
      >
        <h2 className="section-title section-title-acknowledgements">Acknowledgements</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 h-[200px] overflow-y-auto">
          {['NSF', 'ARO', 'ONR', 'NIH', 'DARPA', 'CISCO', 'AMAZON', 'META'].map((sponsor) => {
            const height = sponsorSizes[sponsor] ?? '80px'; // Use default height if not specified
            return (
              <img
                key={sponsor}
                src={`/images/sponsors/${sponsor.toUpperCase()}.png`}
                alt={`${sponsor} logo`}
                style={{ height }} // Apply dynamic height using inline styles
                className="object-contain w-auto"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;