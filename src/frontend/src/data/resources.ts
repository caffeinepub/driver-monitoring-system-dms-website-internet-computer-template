export type Category =
  | "all"
  | "programming-notes"
  | "useful-websites"
  | "coding-practice"
  | "free-courses";

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Exclude<Category, "all">;
  tags: string[];
  downloadUrl?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  all: "All Resources",
  "programming-notes": "Programming Notes",
  "useful-websites": "Useful Websites",
  "coding-practice": "Coding Practice",
  "free-courses": "Free Courses",
};

export const resources: Resource[] = [
  // Programming Notes
  {
    id: "js-es6-cheatsheet",
    title: "JavaScript ES6+ Cheat Sheet",
    description:
      "A complete reference for modern JavaScript: arrow functions, destructuring, promises, async/await, and more.",
    url: "https://devhints.io/es6",
    category: "programming-notes",
    tags: ["javascript", "es6", "cheatsheet"],
    downloadUrl: "https://devhints.io/es6",
  },
  {
    id: "python-quick-reference",
    title: "Python Quick Reference",
    description:
      "Concise Python syntax guide with examples for every concept from basics to OOP.",
    url: "https://www.pythoncheatsheet.org",
    category: "programming-notes",
    tags: ["python", "syntax", "beginner"],
    downloadUrl: "https://www.pythoncheatsheet.org",
  },
  {
    id: "dsa-interview-notes",
    title: "DSA Interview Notes",
    description:
      "Covers arrays, linked lists, trees, sorting algorithms, and graph traversal with complexity analysis.",
    url: "https://github.com/jwasham/coding-interview-university",
    category: "programming-notes",
    tags: ["dsa", "algorithms", "interview"],
  },
  {
    id: "git-github-guide",
    title: "Git & GitHub Guide",
    description:
      "Version control fundamentals: branching, merging, pull requests, and collaboration workflows.",
    url: "https://education.github.com/git-cheat-sheet-education.pdf",
    category: "programming-notes",
    tags: ["git", "github", "version-control"],
    downloadUrl: "https://education.github.com/git-cheat-sheet-education.pdf",
  },

  // Useful Websites
  {
    id: "mdn-web-docs",
    title: "MDN Web Docs",
    description:
      "The most trusted reference for HTML, CSS, and JavaScript with live examples and browser compatibility data.",
    url: "https://developer.mozilla.org",
    category: "useful-websites",
    tags: ["html", "css", "javascript", "reference"],
  },
  {
    id: "stack-overflow",
    title: "Stack Overflow",
    description:
      "The world's largest developer Q&A community. Find answers to virtually any coding question.",
    url: "https://stackoverflow.com",
    category: "useful-websites",
    tags: ["community", "qa", "debugging"],
  },
  {
    id: "css-tricks",
    title: "CSS-Tricks",
    description:
      "In-depth articles and almanac for CSS and front-end development tips, tricks, and tutorials.",
    url: "https://css-tricks.com",
    category: "useful-websites",
    tags: ["css", "frontend", "tutorials"],
  },
  {
    id: "can-i-use",
    title: "Can I Use",
    description:
      "Browser compatibility tables for modern web features — HTML5, CSS3, and JavaScript APIs.",
    url: "https://caniuse.com",
    category: "useful-websites",
    tags: ["browser", "compatibility", "html5", "css"],
  },

  // Coding Practice
  {
    id: "leetcode",
    title: "LeetCode",
    description:
      "The go-to platform for coding interview prep with 2000+ algorithm and data structure challenges.",
    url: "https://leetcode.com",
    category: "coding-practice",
    tags: ["algorithms", "interview", "competitive-programming"],
  },
  {
    id: "hackerrank",
    title: "HackerRank",
    description:
      "Practice coding challenges across algorithms, SQL, machine learning and earn certifications.",
    url: "https://hackerrank.com",
    category: "coding-practice",
    tags: ["challenges", "sql", "certification"],
  },
  {
    id: "codewars",
    title: "Codewars",
    description:
      "Gamified coding practice with kata challenges across many languages and difficulty levels.",
    url: "https://www.codewars.com",
    category: "coding-practice",
    tags: ["gamified", "kata", "multilanguage"],
  },
  {
    id: "exercism",
    title: "Exercism",
    description:
      "Free exercises with mentorship in 50+ programming languages. Great for deliberate practice.",
    url: "https://exercism.org",
    category: "coding-practice",
    tags: ["mentorship", "exercises", "multilanguage"],
  },

  // Free Courses
  {
    id: "freecodecamp",
    title: "freeCodeCamp",
    description:
      "Free 6-month curriculum: responsive design, JavaScript algorithms, APIs, Python, and data science with certificates.",
    url: "https://www.freecodecamp.org",
    category: "free-courses",
    tags: ["fullstack", "javascript", "python", "certificate"],
  },
  {
    id: "the-odin-project",
    title: "The Odin Project",
    description:
      "Project-based full-stack curriculum covering HTML, CSS, JavaScript, and Node.js — completely free.",
    url: "https://www.theodinproject.com",
    category: "free-courses",
    tags: ["fullstack", "html", "css", "javascript"],
  },
  {
    id: "harvard-cs50",
    title: "Harvard CS50",
    description:
      "Harvard's legendary intro to computer science: C, Python, SQL, web development. Free with optional certificate.",
    url: "https://cs50.harvard.edu",
    category: "free-courses",
    tags: ["computer-science", "c", "python", "sql"],
  },
  {
    id: "khan-academy-computing",
    title: "Khan Academy Computing",
    description:
      "Beginner-friendly computing courses: intro to JS, HTML/CSS, SQL, and computer science fundamentals.",
    url: "https://www.khanacademy.org/computing",
    category: "free-courses",
    tags: ["beginner", "javascript", "sql", "free"],
  },
];
