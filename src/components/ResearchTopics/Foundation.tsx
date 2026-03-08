import { features } from "process";

export const Foundation = {
  id: 'Foundation',
  title: 'AI Foundations',
  subtitle: 'to unravel fundamental principles to augment the interpretability and trustworthiness of data-driven decisions',
  image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  content:
    "I am interested in fundamental problems in statistics, machine learning, and multi-agent systems. By addressing these foundational questions, we gain insights into how AI compares to human intelligence and advance the next generation of AI.",
  questions: [
    'Is there a fundamental "Limit of Learning" for given data and tasks? If so, how can we identify it?',
    'How close is a learned model\'s performance to the best possible outcome in hindsight?',
    'How can we efficiently and reliably evaluate model performance beyond conventional metrics?'
  ],
  publications: [
    {
      title: "Provable Identifiability of Two-Layer ReLU Neural Networks via LASSO Regularization",
      authors: ["G. Li", "G. Wang", "J. Ding"],
      venue: "IEEE Transactions on Information Theory",
      year: 2023,
      pdf: "/assets/papers/Identifiability.pdf",
      github: "#",
      chat: "#",
      featured: false
    },
    {
      title: "Asymptotically Optimal Prediction for Time-Varying Data Generating Processes",
      authors: ["J. Ding", "J. Zhou", "V. Tarokh"],
      venue: "IEEE Transactions on Information Theory",
      year: 2019,
      pdf: "/assets/papers/Kinetic.pdf",
      github: "#",
      chat: "#",
      featured: false
    },
    {
      title: "Targeted Cross-Validation",
      authors: ["J. Zhang", "J. Ding", "Y. Yang"],
      venue: "Bernoulli",
      year: 2022,
      pdf: "/assets/papers/TCV.pdf",
      github: "#",
      chat: "#",
      featured: false
    },
    {
      title: "Is a Classification Procedure Good Enough? — A Goodness-of-Fit Assessment Tool for Classification Learning",
      authors: ["J. Zhang", "J. Ding", "Y. Yang"],
      venue: "Journal of the American Statistical Association",
      year: 2022,
      pdf: "/assets/papers/BagofT.pdf",
      github: "https://cran.r-project.org/web/packages/BAGofT/index.html",
      chat: "#",
      featured: false
    },
    {
      title: "On Statistical Efficiency in Learning",
      authors: ["J. Ding", "E. Diao", "J. Zhou", "V. Tarokh"],
      venue: "IEEE Transactions on Information Theory",
      year: 2021,
      pdf: "/assets/papers/Efficiency.pdf",
      github: "#",
      chat: "#",
      featured: false
    },
    {
      title: "Bridging AIC and BIC: A New Criterion for Autoregression",
      authors: ["J. Ding", "V. Tarokh", "Y. Yang"],
      venue: "IEEE Transactions on Information Theory",
      year: 2018,
      pdf: "/assets/papers/BC.pdf",
      github: "#",
      chat: "#",
      featured: false
    }
  ]
};