import type { Experience } from '../types';

export const experience: Experience[] = [
  { company: 'SpaceX', role: 'Software Engineer · Starlink Enterprise', period: 'July 2026 – Present', highlights: [
    'Deliver features across the Starlink ecosystem for its largest enterprise customers.',
    'Build, extend, and scale the systems supporting those customers on the Starlink Enterprise team.'
  ] },
  { company: 'University of Michigan · CHEPS', role: 'Software Engineering Intern', period: 'May 2024 – August 2025', highlights: [
    'Developed a full-stack healthcare simulation tool in C++ and TypeScript, deployed in production across 170 U.S. Department of Veterans Affairs hospitals.',
    'Led a team of junior engineers from initial development to deployment in six months.',
    'Improved performance by 78% through parallelization and cache optimization.'
  ] },
  { company: 'Aptiv', role: 'Software Engineering Intern', period: 'May 2023 – July 2023', highlights: [
    'Built a full-stack analytics platform for vehicle user experience, designed for integration with more than 40 existing platforms.',
    'Designed and deployed a machine-learning service to automate analysis and reporting of kiosk interactions.',
    'Implemented client-side data collection, model integration, network architecture, and concurrent processing.'
  ] },
  { company: 'Aptiv', role: 'Data Science Intern', period: 'May 2022 – August 2022', highlights: [
    'Built a multimodal machine-learning system that combined video and metadata to detect failures in autonomous driving tests.',
    'Collected and refined the video and metadata inputs used to improve model performance.',
    'The model achieved 91% accuracy.'
  ] },
  { company: 'Lakeside Software', role: 'Software Engineer', period: 'June 2018 – August 2021', highlights: [
    'Wrote data mining software to connect user experience problems to their underlying causes.',
    'This work led to US patent 11,461,212 and continuation patent 11,983,088.',
    'The product received a Best of Show award for Digital Workplace at VMworld 2018.'
  ] }
];
