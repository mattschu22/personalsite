import type { FC, ReactNode } from 'react';

// Section Types
export type SectionId = 'intro' | 'about' | 'work' | 'projects' | 'contact';

export interface SectionComponentProps {
  onNavigate?: (sectionId: SectionId) => void;
}

export interface Section {
  id: SectionId;
  label: string;
  component: FC<SectionComponentProps>;
}

// Data Types
export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Degree {
  title: string;
  status: string;
  gpa: string | null;
  courses?: string[];
  honors?: string[] | null;
}

export interface Education {
  school: string;
  degrees: Degree[];
  keyCourses: string[];
}

export interface Skills {
  languages: string[];
  expertise: string[];
}

export interface Patent {
  type: string;
  number: string;
  title: string;
  continuation?: string;
}

export interface Publication {
  type: string;
  id: string;
  title: string;
}

// Component Props
export interface SectionBarProps {
  id: SectionId;
  label: string;
  index: number;
  isActive: boolean;
  onClick: (id: SectionId, isUserAction?: boolean) => void;
  children?: ReactNode;
}

export interface ContentPanelProps {
  children: ReactNode;
  className?: string;
}
