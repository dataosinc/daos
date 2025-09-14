import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Users, ExternalLink, Search, Filter } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  completed: boolean;
  hasPlayground: boolean;
  hasQuiz: boolean;
  progress: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  lessonCount: number;
  completedCount: number;
}

export default function LMSHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      id: 'all',
      name: 'All Courses',
      description: 'Browse all available learning content',
      lessonCount: 24,
      completedCount: 8
    },
    {
      id: 'dbms-basics',
      name: 'DBMS Fundamentals',
      description: 'Core database concepts and principles',
      lessonCount: 8,
      completedCount: 3
    },
    {
      id: 'nosql-concepts',
      name: 'NoSQL Concepts',
      description: 'Document, key-value, and graph databases',
      lessonCount: 6,
      completedCount: 2
    },
    {
      id: 'data-modeling',
      name: 'Data Modeling',
      description: 'Entity relationships, normalization, and schema design',
      lessonCount: 7,
      completedCount: 2
    },
    {
      id: 'daos-platform',
      name: 'DAOS Platform',
      description: 'How to use DAOS tools and features effectively',
      lessonCount: 9,
      completedCount: 4
    }
  ];

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Entity-Relationship Modeling',
      category: 'data-modeling',
      difficulty: 'beginner',
      duration: '15 min',
      description: 'Learn the basics of ER diagrams and how to model real-world relationships',
      completed: true,
      hasPlayground: true,
      hasQuiz: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Primary Keys and Foreign Keys',
      category: 'dbms-basics',
      difficulty: 'beginner',
      duration: '12 min',
      description: 'Understand how to identify and implement primary and foreign key relationships',
      completed: true,
      hasPlayground: true,
      hasQuiz: true,
      progress: 100
    },
    {
      id: '3',
      title: 'Data Deduplication Strategies',
      category: 'daos-platform',
      difficulty: 'intermediate',
      duration: '20 min',
      description: 'Master techniques for identifying and resolving duplicate records',
      completed: false,
      hasPlayground: true,
      hasQuiz: true,
      progress: 65
    },
    {
      id: '4',
      title: 'Schema Mapping with DAOS Agents',
      category: 'daos-platform',
      difficulty: 'intermediate',
      duration: '25 min',
      description: 'Use AI agents to automatically map fields between different data sources',
      completed: false,
      hasPlayground: true,
      hasQuiz: false,
      progress: 0
    },
    {
      id: '5',
      title: 'Document Database Fundamentals',
      category: 'nosql-concepts',
      difficulty: 'beginner',
      duration: '18 min',
      description: 'Learn about document stores, JSON structures, and flexible schemas',
      completed: false,
      hasPlayground: false,
      hasQuiz: true,
      progress: 0
    },
    {
      id: '6',
      title: 'Creating Golden Data Sets',
      category: 'daos-platform',
      difficulty: 'advanced',
      duration: '30 min',
      description: 'Build comprehensive golden records using survivorship rules and data quality checks',
      completed: false,
      hasPlayground: true,
      hasQuiz: true,
      progress: 0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Learn & Educate</h1>
          <p className="text-gray-600">Master data concepts and DAOS platform capabilities through interactive lessons</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
              <div className="text-sm text-blue-700">Lessons Completed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">3</div>
              <div className="text-sm text-green-700">Certificates Earned</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-sm text-purple-700">Playground Sessions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">42h</div>
              <div className="text-sm text-orange-700">Time Invested</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search lessons and topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                <Filter size={16} />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">{category.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{category.description}</div>
                    <div className="flex justify-between text-xs">
                      <span>{category.completedCount}/{category.lessonCount} completed</span>
                      <span>{Math.round((category.completedCount / category.lessonCount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(category.completedCount / category.lessonCount) * 100}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {lesson.completed ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <Clock className="text-gray-400" size={20} />
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>

                    {lesson.progress > 0 && lesson.progress < 100 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-600">{lesson.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-4">
                      {lesson.hasPlayground && (
                        <div className="flex items-center space-x-1">
                          <ExternalLink size={12} />
                          <span>Playground</span>
                        </div>
                      )}
                      {lesson.hasQuiz && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle size={12} />
                          <span>Quiz</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        <Play size={16} />
                        <span>{lesson.completed ? 'Review' : lesson.progress > 0 ? 'Continue' : 'Start'}</span>
                      </button>
                      
                      {lesson.hasPlayground && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                          Try It
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen size={20} className="text-blue-600" />
                <h3 className="font-medium text-gray-900">First Time Setup</h3>
              </div>
              <p className="text-sm text-gray-600">Connect your first data source and explore the 360° view</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <Users size={20} className="text-green-600" />
                <h3 className="font-medium text-gray-900">Team Onboarding</h3>
              </div>
              <p className="text-sm text-gray-600">Set up roles, permissions, and collaborative workflows</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <ExternalLink size={20} className="text-purple-600" />
                <h3 className="font-medium text-gray-900">Advanced Techniques</h3>
              </div>
              <p className="text-sm text-gray-600">Master complex data modeling and agent configurations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}