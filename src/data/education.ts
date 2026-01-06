import type { Education, Skills, Patent, Publication } from '../types';

export const education: Education = {
  school: "University of Michigan, Ann Arbor",
  degrees: [
    {
      title: "M.S.E. Computer Science",
      status: "Expected May 2026",
      gpa: "4.0/4.0",
      courses: ["Operating Systems", "Compilers", "Scalable Systems"]
    },
    {
      title: "B.S.E. Computer Science",
      status: "Summa Cum Laude | May 2025",
      gpa: "3.9/4.0",
      honors: ["William J. Branstrom Prize", "University Honors", "Dean's List (All Semesters)"]
    },
    {
      title: "B.B.A. Business Administration",
      status: "Magna Cum Laude",
      gpa: null,
      honors: null
    }
  ],
  keyCourses: [
    "Distributed Systems",
    "Machine Learning",
    "LLMs",
    "Databases",
    "Networking",
    "Web Systems",
    "UX Design"
  ]
};

export const skills: Skills = {
  languages: ["C++", "Go", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  expertise: [
    "Multi-threading & Concurrency",
    "Networking & Distributed Systems",
    "Machine Learning & AI Tools",
    "Databases & Web Applications",
    "Cybersecurity",
    "Data Structures & Algorithms"
  ]
};

export const patents: Patent[] = [
  {
    type: "US Patent",
    number: "11,461,212",
    title: "Apparatus and Method for Determining the Underlying Cause of User Experience Degradation",
    continuation: "11,983,088"
  }
];

export const publications: Publication[] = [
  {
    type: "Publication",
    id: "PubMed ID 39237997",
    title: "Developing a systems-focused tool for modeling lung cancer screening resource needs"
  }
];
