export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "promail",
    title: "ProMail — AI Email Composition Tool",
    description:
      "A Python-based tool that uses AI to help users compose professional emails. Accepts context inputs and generates structured, tone-appropriate email drafts for workplace communication.",
    technologies: ["Python", "AI / LLM", "NLP", "CLI"],
    githubUrl:
      "https://github.com/Aravindhdit/ProMail-Enhancing-Email-Composition-",
    liveUrl: "",
    featured: true,
    image: "",
  },
  {
    id: "apple-products-analysis",
    title: "Apple Products Sales Analysis",
    description:
      "Exploratory data analysis of Apple iPhone pricing, discounts, ratings, reviews, and customer engagement using Python. Analyses Flipkart product data with Pandas, NumPy, SciPy, and Matplotlib to uncover pricing trends and statistical relationships.",
    technologies: ["Python", "Pandas", "NumPy", "SciPy", "Jupyter Notebook"],
    githubUrl:
      "https://github.com/Aravindhdit/AppleProductsPythonProject",
    liveUrl: "",
    featured: true,
    image: "",
  },
  {
    id: "music-store-sql",
    title: "Music Store SQL Analysis",
    description:
      "A relational database analysis project that uses SQL to answer customer, sales, artist, genre, and revenue-related business questions. Queries are organised into Easy, Moderate, and Advanced levels covering invoice activity, top artists, and country-level purchasing behaviour.",
    technologies: ["SQL", "MySQL", "Data Analysis"],
    githubUrl: "https://github.com/Aravindhdit/MusicStoreSQL",
    liveUrl: "",
    featured: true,
    image: "",
  },
  {
    id: "atm-dashboard",
    title: "ATM Transaction Analysis Dashboard",
    description:
      "A multi-page Power BI dashboard that analyses ATM revenue, transactions, uptime, operating costs, gross profit, and margin ranges. Converts Excel-based ATM data into interactive reports with state-level performance comparison.",
    technologies: ["Power BI", "DAX", "Excel", "Data Modelling"],
    githubUrl: "https://github.com/Aravindhdit/ProThemePowerBI",
    liveUrl: "",
    featured: true,
    image: "",
  },
  {
    id: "wifi-detector",
    title: "WiFi Detector Application",
    description:
      "A Java application that detects the connected WiFi version, analyses network capabilities, and provides router upgrade recommendations. Supports Windows, macOS, and Linux using platform-specific network commands.",
    technologies: ["Java", "Networking", "Cross-Platform"],
    githubUrl: "https://github.com/Aravindhdit/WiFi-Detector",
    liveUrl: "",
    featured: false,
    image: "",
  },
  {
    id: "algorithm-playground",
    title: "Algorithm Playground",
    description:
      "A collection of 24+ algorithm implementations in Java covering sorting, graph traversal, and dynamic programming. Each algorithm is fully documented with clean, production-quality code following best practices.",
    technologies: ["Java", "DSA", "Algorithms"],
    githubUrl: "https://github.com/Aravindhdit/algorithm-playground",
    liveUrl: "",
    featured: false,
    image: "",
  },
];
