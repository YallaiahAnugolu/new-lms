import { Brain, Shield, Database, Cloud, Code, Layout, Settings } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  videoId?: string;
  startTime?: number;
  endTime?: number;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  image: string;
  instructor: string;
  rating: number;
  sections: Section[];
}

export const CATEGORIES = [
  { id: 'all', name: 'All Areas', icon: Layout },
  { id: 'ai', name: 'Artificial Intelligence', icon: Brain },
  { id: 'cyber', name: 'Cybersecurity', icon: Shield },
  { id: 'data', name: 'Data Science', icon: Database },
  { id: 'cloud', name: 'Cloud Computing', icon: Cloud },
  { id: 'dev', name: 'Software Engineering', icon: Code },
  { id: 'admin', name: 'Admin Portal', icon: Settings },
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Fundamentals of Machine Learning',
    category: 'Artificial Intelligence',
    description: 'Master the core concepts of supervised and unsupervised learning through hands-on practical video tutorials.',
    level: 'Beginner',
    lessonsCount: 12,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    sections: [
      {
        id: 's1',
        title: 'Section 1: Basics',
        lessons: [
          { id: 'l1', title: 'What is Machine Learning?', duration: '8:35', isCompleted: true },
          { id: 'l2', title: 'Mathematics for ML', duration: '15:20', isCompleted: true },
          { id: 'l3', title: 'ML Pipeline Overview', duration: '12:00', isCompleted: false },
        ]
      },
      {
        id: 's2',
        title: 'Section 2: Supervised Learning',
        lessons: [
          { id: 'l4', title: 'Linear Regression', duration: '22:15', isCompleted: false },
          { id: 'l5', title: 'Classification Algorithms', duration: '28:40', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Network Security Essentials',
    category: 'Cybersecurity',
    description: 'Protect modern digital infrastructures by understanding vulnerabilities, encryption, and firewalls.',
    level: 'Beginner',
    lessonsCount: 15,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    instructor: 'Marcus Wright',
    rating: 4.9,
    sections: []
  },
  {
    id: '3',
    title: 'Python for Data Analysis',
    category: 'Data Science',
    description: 'Learn to clean, manipulate, and visualize complex datasets using Pandas and Matplotlib.',
    level: 'Intermediate',
    lessonsCount: 10,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    instructor: 'Emily Davis',
    rating: 4.7,
    sections: []
  },
  {
    id: '4',
    title: 'AWS Solutions Architect Intro',
    category: 'Cloud Computing',
    description: 'An entry-level guide to designing distributed systems on the Amazon Web Services platform.',
    level: 'Beginner',
    lessonsCount: 18,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    instructor: 'James Wilson',
    rating: 4.6,
    sections: []
  }
];
