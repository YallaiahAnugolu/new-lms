import React, { useState, useEffect } from 'react';
import { set as idbSet, get as idbGet } from 'idb-keyval';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, Settings, User, 
  ChevronRight, PlayCircle, Clock, 
  CheckCircle, SignalHigh, Info, Star,
  MessageSquare, BookOpen,
  ChevronDown, ChevronLeft, Maximize2,
  Volume2, FastForward, Play, Pause,
  Save, FileText,
  Upload, Plus, Trash2, Calendar
} from 'lucide-react';
import { MOCK_COURSES, CATEGORIES, Course, Lesson } from './types';

// --- Shared Components ---

const IS_ADMIN_ENABLED = import.meta.env.VITE_ENABLE_ADMIN === 'true';

const Navbar = ({ onHomeClick, onAdminClick, currentPage }: { 
  onHomeClick: () => void,
  onAdminClick: () => void,
  currentPage: string
}) => (
  <header className="fixed top-0 w-full h-16 flex items-center justify-between px-6 glass-nav z-50 border-b border-outline-variant/30">
    <div className="flex items-center gap-10">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onHomeClick}
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
          <img src="/Brovai_Logo.e9892086.png" alt="BrovAI Logo" className="w-full h-full object-cover rounded-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-display font-black tracking-tight text-primary leading-none">BrovAI</span>
          <span className="text-[7px] font-bold text-secondary tracking-[0.2em] uppercase mt-0.5">AI Olympiad for Schools</span>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold">
        <button 
          onClick={onHomeClick} 
          className={`${(currentPage === 'catalog' || currentPage === 'course-view') ? 'text-primary relative after:absolute after:bottom-[-21px] after:left-0 after:w-full after:h-[2px] after:bg-primary' : 'text-on-surface-variant hover:text-primary transition-colors'}`}
        >
          Course Catalog
        </button>
        {IS_ADMIN_ENABLED && (
          <button 
            onClick={onAdminClick} 
            className={`${currentPage === 'admin' ? 'text-primary relative after:absolute after:bottom-[-21px] after:left-0 after:w-full after:h-[2px] after:bg-primary' : 'text-on-surface-variant hover:text-primary transition-colors'} flex items-center gap-1.5`}
          >
            <Settings className="w-4 h-4" />
            Admin Portal
          </button>
        )}
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <BookOpen className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-display font-bold text-primary">BrovAI</span>
        </div>
        <p className="text-sm text-text-secondary">© 2024 BrovAI Academy. Empowering the next generation of technologists.</p>
      </div>
      <div className="flex gap-8 text-sm font-semibold text-on-surface-variant">
        <a href="#" className="hover:text-primary transition-colors">Help Center</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Sub-pages ---

const CatalogPage = ({ courses, onSelectCourse }: { courses: Course[], onSelectCourse: (course: Course) => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [visibleCount, setVisibleCount] = useState(12);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || 
      course.category.toLowerCase().includes(
        CATEGORIES.find(c => c.id === activeCategory)?.name.toLowerCase() || ''
      );
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  // Reset pagination when filters change
  React.useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern py-12 px-6 text-center border-b border-outline-variant/10 relative overflow-hidden">
        {/* Decorative Blobs */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 15, -5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-[600px] h-[600px] bg-accent-purple/15 rounded-full blur-[120px] -z-10 pointer-events-none"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, -15, 10, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-[10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] -z-10 pointer-events-none"
        ></motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight relative z-10"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#2b6d70] to-accent-purple">
            Explore Our Video Learning Catalog
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-8 font-medium relative z-10 leading-relaxed"
        >
          High-fidelity academic courses designed for deep focus and mastery in modern technology sectors.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto bg-white/60 backdrop-blur-2xl border border-white/40 rounded-full p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] flex items-center gap-2 focus-within:ring-4 ring-primary/20 transition-all duration-300 relative z-10 group hover:border-white/80"
        >
          <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0 ml-1 group-focus-within:bg-primary/10 transition-colors">
            <Search className="text-primary w-5 h-5" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, skills, or certifications..." 
            className="w-full bg-transparent border-none outline-none text-on-surface p-3 font-bold placeholder:text-outline/70"
          />
          <button className="bg-primary hover:bg-primary-container text-white px-10 py-3.5 rounded-full font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-lg shadow-primary/20 text-sm">
            Find Course
          </button>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 h-fit sticky top-28">
          <h2 className="font-display font-bold text-xl mb-6 text-primary">Areas of Study</h2>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 w-full p-4 rounded-xl font-semibold transition-all group ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
                }`}
              >
                <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-outline group-hover:text-primary'}`} />
                <span className="text-sm font-display">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-surface-container-highest rounded-2xl border border-outline-variant shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <SignalHigh className="w-20 h-20 text-primary" />
            </div>
            <h3 className="font-bold text-primary mb-2 relative z-10">Upgrade to Pro</h3>
            <p className="text-xs text-text-secondary mb-4 relative z-10 leading-relaxed">Unlock unlimited access to all professional certifications and expert projects.</p>
            <button className="w-full bg-primary text-white py-3 rounded-lg text-xs font-bold hover:bg-primary-container transition-colors relative z-10">
              Go Premium
            </button>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-medium text-text-secondary">
              Showing <span className="font-bold text-on-surface">{filteredCourses.length}</span> high-quality courses
            </span>
            <div className="flex items-center gap-2 border border-outline-variant px-4 py-2 rounded-lg bg-surface-container-lowest text-xs font-bold cursor-pointer hover:bg-surface-container transition-colors">
              <span>Sort by: Popularity</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCourses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200/60 course-card-shadow flex flex-col group cursor-pointer overflow-hidden"
                onClick={() => onSelectCourse(course)}
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-primary/90 text-white text-[9px] font-bold px-2 py-1 rounded-md tracking-wider uppercase backdrop-blur-sm shadow-md">
                    {course.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 ${i < Math.floor(course.rating) ? 'text-secondary fill-secondary' : 'text-slate-200'}`} 
                      />
                    ))}
                    <span className="text-[9px] font-black text-slate-400 ml-1">{course.rating}</span>
                  </div>
                  <h3 className="text-sm font-display font-bold text-primary mb-1.5 line-clamp-1 leading-tight group-hover:text-primary-container transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary/80 line-clamp-2 mb-4 leading-relaxed h-[32px]">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 text-on-surface-variant font-bold text-[10px] mb-4 opacity-60">
                      <div className="flex items-center gap-1">
                        <SignalHigh className="w-3.5 h-3.5 text-primary/60" />
                        {course.level}
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-3.5 h-3.5 text-primary/60" />
                        {course.lessonsCount} 
                      </div>
                    </div>
                    <button className="w-full bg-slate-50 text-primary border border-slate-200 py-2 rounded-lg font-bold text-[11px] hover:bg-primary hover:text-white transition-all active:scale-[0.97] uppercase tracking-wider">
                      Start Course
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {visibleCount < filteredCourses.length && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="flex items-center gap-2 border-2 border-outline-variant px-8 py-3 rounded-xl text-primary font-bold hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                Load More Courses
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const CoursePlayerPage = ({ course, onBack }: { course: Course, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['s1']);
  const [activeLessonId, setActiveLessonId] = useState('l1');
  
  // Progress State
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(course.sections.flatMap(s => s.lessons).filter(l => l.isCompleted).map(l => l.id))
  );

  // Notes State
  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState('');

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const activeLesson = course.sections.flatMap(s => s.lessons).find(l => l.id === activeLessonId);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (activeLesson?.startTime !== undefined) {
        videoRef.current.currentTime = activeLesson.startTime;
      }
      setIsPlaying(true);
    }
  }, [activeLessonId]);

  React.useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (activeLesson?.endTime !== undefined && videoRef.current.currentTime >= activeLesson.endTime) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      if (activeLesson?.startTime !== undefined) {
        videoRef.current.currentTime = activeLesson.startTime;
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Calculate Progress
  const totalLessons = course.sections.flatMap(s => s.lessons).length;
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const toggleLessonCompletion = () => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(activeLessonId)) {
        next.delete(activeLessonId);
      } else {
        next.add(activeLessonId);
      }
      return next;
    });
  };

  const handleSaveNote = () => {
    setLessonNotes(prev => ({
      ...prev,
      [activeLessonId]: currentNote
    }));
  };

  // Update current note when lesson changes
  React.useEffect(() => {
    setCurrentNote(lessonNotes[activeLessonId] || '');
  }, [activeLessonId, lessonNotes]);

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
          }
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration]);

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Top Breadcrumb Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 py-4 sticky top-16 z-40">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95 text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <div>
            <h1 className="font-display font-extrabold text-primary text-xl tracking-tight leading-none mb-1">
              {course.title}
            </h1>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
              Professional Certification Course • Section 1
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Overall Progress</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-progress-green shadow-[0_0_8px_rgba(46,125,50,0.3)]"
                ></motion.div>
              </div>
              <span className="text-xs font-bold text-primary">{progressPercent}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-128px)]">
        {/* Left Column: Video Content (70%) */}
        <section className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-[1100px] mx-auto">
            {/* Video Player Container */}
            <div ref={videoContainerRef} className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group border border-slate-200/20">
              {activeLesson?.videoUrl ? (
                <video 
                  ref={videoRef}
                  src={activeLesson.videoUrl}
                  className="w-full h-full"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              ) : (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${course.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent"></div>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:opacity-100 transition-opacity opacity-0 pointer-events-none">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/20 shadow-2xl pointer-events-auto"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white fill-current" />
                  ) : (
                    <Play className="w-10 h-10 text-white fill-current translate-x-1" />
                  )}
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div 
                  className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mb-6 cursor-pointer relative"
                  onClick={handleSeek}
                >
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-progress-green shadow-[0_0_12px_rgba(46,125,50,0.6)]"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></motion.div>
                </div>
                <div className="flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-6">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button onClick={() => {
                       if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
                    }}>
                      <FastForward className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </button>
                    
                    <div 
                      className="relative flex items-center gap-2"
                      onMouseEnter={() => setIsVolumeHovered(true)}
                      onMouseLeave={() => setIsVolumeHovered(false)}
                    >
                      <button onClick={() => setVolume(v => v === 0 ? 80 : 0)}>
                        <Volume2 className="w-5 h-5 cursor-pointer" />
                      </button>
                      <AnimatePresence>
                        {isVolumeHovered && (
                          <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 80, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="flex items-center"
                          >
                            <input 
                              type="range" 
                              min="0" max="100" 
                              value={volume}
                              onChange={(e) => setVolume(Number(e.target.value))}
                              className="w-full h-1 appearance-none rounded-full cursor-pointer accent-white"
                              style={{
                                background: `linear-gradient(to right, white ${volume}%, rgba(255,255,255,0.3) ${volume}%)`
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <span className="text-xs font-bold font-sans">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <Settings className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    <button onClick={toggleFullscreen}>
                      <Maximize2 className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Header */}
            <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="font-display font-extrabold text-3xl tracking-tight text-primary">
                  {activeLesson?.title || 'Course Lesson'}
                </h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">
                  {course.category} • Lesson {activeLessonId} • {activeLesson?.duration || '8:35'} min
                </p>
              </div>
              <button 
                onClick={toggleLessonCompletion}
                className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 transition-all ${
                  completedLessons.has(activeLessonId)
                    ? 'bg-progress-green text-white shadow-lg shadow-progress-green/20'
                    : 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                }`}
              >
                <CheckCircle className={`w-5 h-5 ${completedLessons.has(activeLessonId) ? 'fill-current' : ''}`} />
                {completedLessons.has(activeLessonId) ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="mt-14 border-b border-slate-100">
              <div className="flex gap-10">
                {['overview', 'course-details', 'q&a', 'notes'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 text-sm font-bold tracking-tight transition-all relative capitalize ${
                      activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-primary'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-10 grid lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="font-display font-bold text-xl text-primary mb-5 tracking-tight">About this lesson</h3>
                      <p className="text-body-md text-slate-600 leading-relaxed font-medium">
                        {course.description} In this technical deep-dive, we explore professional architectural patterns 
                        and production-grade implementations. You'll gain practical experience using the exact same frameworks 
                        and methodologies deployed by industry-leading engineers at global technology firms.
                      </p>
                      
                      <div className="mt-12 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
                            <FileText className="w-7 h-7" />
                          </div>
                          <div>
                            <p className="font-bold text-primary tracking-tight">Technical Reference Guide.pdf</p>
                            <p className="text-xs text-slate-400 font-medium">Comprehensive study material • 4.2 MB</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors group">
                          <PlayCircle className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform rotate-90" />
                          Download PDF
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'course-details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {[
                        { icon: User, label: 'Instructor', value: course.instructor },
                        { icon: PlayCircle, label: 'Total Content', value: `${course.lessonsCount} HD Lessons` },
                        { icon: Bell, label: 'Rating', value: `${course.rating} / 5.0` },
                        { icon: CheckCircle, label: 'Certification', value: 'BrovAI Official ID' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl group hover:border-primary transition-all cursor-default">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                              <item.icon className="text-primary w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider leading-none mb-1">{item.label}</p>
                              <p className="text-sm font-bold text-on-surface">{item.value}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'notes' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-display font-black text-primary text-xl tracking-tight">Personal Study Notes</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Capture insights for Lesson {activeLessonId}</p>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary">
                            <FileText className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <textarea 
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="Type your insights here..." 
                            className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-6 text-sm focus:ring-4 ring-primary/5 focus:border-primary/20 focus:bg-white outline-none h-64 transition-all resize-none shadow-inner font-medium text-slate-700"
                          />
                          <div className="absolute top-4 right-4 opacity-10 group-focus-within:opacity-30 transition-opacity">
                            <Plus className="w-6 h-6 text-primary" />
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                  {i}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] font-bold text-slate-400">Auto-saved to local workspace</p>
                          </div>
                          <button 
                            onClick={handleSaveNote}
                            className="w-full sm:w-auto bg-primary text-white px-10 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-container shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save Insight
                          </button>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-center text-xs font-bold text-slate-400 italic">"The beautiful thing about learning is that no one can take it away from you."</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-display font-bold text-primary mb-5 tracking-tight text-lg">Learning Objectives</h4>
                  <ul className="space-y-4">
                    {[
                      'Master complex data architectures',
                      'Identify and mitigate vulnerabilities',
                      'Deploy to global cloud scale',
                      'Technical lead-level communication'
                    ].map((obj, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                        <CheckCircle className="text-secondary w-5 h-5 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-8 bg-primary rounded-2xl relative overflow-hidden text-white shadow-xl shadow-primary/20">
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <h4 className="font-display font-bold text-lg mb-2">Unlock Pro Labs</h4>
                    <p className="text-xs text-white/70 mb-6 leading-relaxed">Upgrade to access interactive cloud sandbox labs and mentorship.</p>
                    <button className="w-full bg-secondary text-white py-3 rounded-xl text-sm font-extrabold hover:bg-secondary/90 transition-all shadow-xl shadow-black/10">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Sidebar Curriculum (30%) */}
        <aside className="w-full lg:w-[380px] bg-white/60 backdrop-blur-xl border-l border-slate-100 flex flex-col h-[calc(100vh-128px)] sticky top-32 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-white/40">
            <h3 className="font-display font-bold text-primary mb-4 flex justify-between items-center text-sm tracking-tight">
              Course Content
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{progressPercent}% Complete</span>
            </h3>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-progress-green shadow-[0_0_8px_rgba(46,125,50,0.3)]"
              ></motion.div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto lesson-scroll">
            {course.sections.map((section, idx) => (
              <div key={section.id} className="mb-2">
                <div 
                  onClick={() => toggleSection(section.id)}
                  className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between cursor-pointer sticky top-0 z-10 backdrop-blur-md hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-black text-primary text-[11px] tracking-[0.05em] uppercase">SECTION {idx + 1}: {section.title.split(':').pop()?.trim() || section.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 leading-none">
                      {section.lessons.filter(l => completedLessons.has(l.id)).length} / {section.lessons.length} Lessons • 45 min
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {expandedSections.includes(section.id) && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-white/20"
                    >
                      {section.lessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`px-8 py-5 flex items-center gap-5 border-l-4 transition-all cursor-pointer group ${
                            activeLessonId === lesson.id 
                              ? 'bg-primary/5 border-primary pl-9' 
                              : 'border-transparent hover:bg-slate-50 hover:pl-9'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            completedLessons.has(lesson.id)
                              ? 'bg-secondary/5 border border-secondary/10' 
                              : activeLessonId === lesson.id 
                              ? 'bg-primary shadow-lg shadow-primary/25 scale-110' 
                              : 'border-2 border-slate-100 group-hover:border-primary/20'
                          }`}>
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle className="text-secondary w-5 h-5 shadow-sm" />
                            ) : activeLessonId === lesson.id ? (
                              <Play className="text-white w-4 h-4 fill-current ml-0.5" />
                            ) : (
                              <Play className="text-slate-300 w-4 h-4 group-hover:text-primary/40 ml-0.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate tracking-tight transition-colors leading-none mb-1.5 ${
                              activeLessonId === lesson.id ? 'text-primary' : 'text-slate-500 group-hover:text-primary'
                            }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2">
                              {activeLessonId === lesson.id ? (
                                <span className="text-[10px] text-primary/80 font-black uppercase tracking-widest flex items-center gap-1 leading-none">
                                  <SignalHigh className="w-3 h-3" /> Now Playing
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 leading-none">
                                  <Clock className="w-3 h-3" /> {lesson.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="p-8 bg-surface-container-low border-t border-slate-100 flex flex-col gap-3">
             <button className="w-full bg-white border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-primary text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                <MessageSquare className="w-4 h-4" />
                Discuss Lesson
             </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

// --- Admin Panel Component ---

// --- Custom Date Picker ---
const CustomDatePicker = ({ 
  selectedDate, 
  onSelect 
}: { 
  selectedDate: string; 
  onSelect: (date: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  });

  const today = new Date();
  today.setHours(0,0,0,0);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-primary" />
          <span className={selectedDate ? "text-slate-800 font-bold" : "text-slate-400 font-medium"}>
            {selectedDate ? new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "Select a date..."}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 mt-2 p-4 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h4 className="font-bold text-primary">{monthNames[month]} {year}</h4>
              <button type="button" onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-[10px] font-black text-slate-400 uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} className="h-8" />;
                
                const isPast = date < today;
                const localDateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                const isSelected = selectedDate === localDateStr;
                const isToday = date.getTime() === today.getTime();

                return (
                  <button
                    key={date.getTime()}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      onSelect(localDateStr);
                      setIsOpen(false);
                    }}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected ? 'bg-primary text-white shadow-md shadow-primary/30' : 
                      isPast ? 'text-slate-300 cursor-not-allowed' :
                      'text-slate-700 hover:bg-primary/10 hover:text-primary'
                    } ${isToday && !isSelected ? 'border border-primary/30 text-primary' : ''}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminPanel = ({ 
  courses, 
  onAddCourse, 
  onUpdateCourse, 
  onDeleteCourse 
}: { 
  courses: Course[], 
  onAddCourse: (course: Course) => void,
  onUpdateCourse: (course: Course) => void,
  onDeleteCourse: (courseId: string) => void
}) => {
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Artificial Intelligence');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800');
  const [customImages, setCustomImages] = useState<string[]>([]);
  
  // Video Upload State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lessonTitle, setLessonTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [autoSplit, setAutoSplit] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Publishing State
  const [publishLater, setPublishLater] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');

  const videoBlobUrlRef = React.useRef<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Artificial Intelligence');
    setLevel('Beginner');
    setImageUrl('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800');
    setVideoFile(null);
    setLessonTitle('');
    setUploadStatus('idle');
    setPublishLater(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setCategory(course.category);
    setLevel(course.level);
    setImageUrl(course.image);
    if (!course.image.includes('unsplash.com') && !customImages.includes(course.image)) {
      setCustomImages([...customImages, course.image]);
    }
    setCurrentView('edit');
  };

  const handleCreateNew = () => {
    setEditingCourse(null);
    resetForm();
    setCurrentView('edit');
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    if (!editingCourse) return;
    if (!window.confirm("Are you sure you want to delete this video lesson?")) return;

    const updatedSections = editingCourse.sections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: sec.lessons.filter(l => l.id !== lessonId)
        };
      }
      return sec;
    });

    const updatedCourse = {
      ...editingCourse,
      sections: updatedSections,
      lessonsCount: updatedSections.reduce((acc, sec) => acc + sec.lessons.length, 0)
    };

    setEditingCourse(updatedCourse);
    onUpdateCourse(updatedCourse);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCustomImages(prev => [...prev, url]);
      setImageUrl(url);
    }
  };

  // Video Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setVideoFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalVideoUrl: string | undefined = undefined;
    let generatedLessons: Lesson[] = [];

    let videoId: string | undefined = undefined;

    // Only process upload if a new video file is selected
    if (videoFile) {
      setIsUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(0);

      videoId = 'video_' + Date.now();
      try {
        await idbSet(videoId, videoFile);
      } catch (err) {
        console.error("Failed to save video to IndexedDB", err);
      }

      if (videoBlobUrlRef.current) URL.revokeObjectURL(videoBlobUrlRef.current);
      for (let p = 10; p <= 90; p += 20) {
        await new Promise(r => setTimeout(r, 120));
        setUploadProgress(p);
      }
      finalVideoUrl = URL.createObjectURL(videoFile);
      videoBlobUrlRef.current = finalVideoUrl;
      setUploadProgress(100);
      setUploadStatus('done');

      if (autoSplit) {
        setIsAnalyzing(true);
        await new Promise(r => setTimeout(r, 3000));
        generatedLessons = [
          { id: 'new_l1_' + Date.now(), title: 'Introduction & Setup', duration: '2:00', isCompleted: false, videoUrl: finalVideoUrl, videoId, startTime: 0, endTime: 120 },
          { id: 'new_l2_' + Date.now(), title: 'Core Concepts', duration: '5:00', isCompleted: false, videoUrl: finalVideoUrl, videoId, startTime: 120, endTime: 420 },
          { id: 'new_l3_' + Date.now(), title: 'Practical Examples', duration: '1:35', isCompleted: false, videoUrl: finalVideoUrl, videoId, startTime: 420, endTime: 515 },
        ];
        setIsAnalyzing(false);
      } else {
        generatedLessons = [{
          id: 'new_l_' + Date.now(),
          title: lessonTitle || 'New Lesson',
          duration: '8:35',
          isCompleted: false,
          videoUrl: finalVideoUrl,
          videoId
        }];
      }
      setIsUploading(false);
    }

    if (editingCourse) {
      // Edit Mode
      let updatedSections = [...editingCourse.sections];
      
      // If we uploaded new videos, append them to the first section, or create a new section
      if (generatedLessons.length > 0) {
        if (updatedSections.length > 0) {
          updatedSections[0].lessons = [...updatedSections[0].lessons, ...generatedLessons];
        } else {
          updatedSections.push({
            id: 's_' + Date.now(),
            title: 'Module: Updates',
            lessons: generatedLessons
          });
        }
      }

      const updatedCourse: Course = {
        ...editingCourse,
        title,
        description,
        category,
        level,
        image: imageUrl,
        sections: updatedSections,
        lessonsCount: updatedSections.reduce((acc, sec) => acc + sec.lessons.length, 0)
      };

      onUpdateCourse(updatedCourse);
      alert('✅ Course Updated Successfully!');
      setCurrentView('list');

    } else {
      // Create Mode
      if (!videoFile) {
        alert("Please upload a video for the new course.");
        return;
      }
      
      const newCourse: Course = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        category,
        level,
        image: imageUrl,
        instructor: 'Dr. Sarah Jenkins',
        rating: 5.0,
        lessonsCount: generatedLessons.length,
        sections: [{
          id: 's1',
          title: 'Module 1: Complete Content',
          lessons: generatedLessons
        }]
      };

      onAddCourse(newCourse);
      if (publishLater) {
        alert(`Course Scheduled!\n\nTitle: ${title}\nDate: ${publishDate} at ${publishTime}`);
      } else {
        alert('✅ Course Published Successfully!');
      }
      setCurrentView('list');
    }
  };

  if (currentView === 'list') {
    return (
      <div className="pt-24 pb-12 px-10 min-h-screen bg-[#F4F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-display font-extrabold text-primary mb-2">Course Management</h2>
              <p className="text-text-secondary">View and manage your existing courses.</p>
            </div>
            <button 
              onClick={handleCreateNew}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" /> Add New Course
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Course Title</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Lessons</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img src={course.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-primary text-sm">{course.title}</p>
                        <p className="text-xs text-slate-500">{course.level}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">{course.category}</td>
                    <td className="p-4 text-sm font-medium text-slate-600">{course.lessonsCount}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors inline-block"
                        title="Edit Course"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete course "${course.title}"?`)) onDeleteCourse(course.id);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">No courses found. Create one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // EDIT / CREATE VIEW
  return (
    <div className="pt-24 pb-12 px-10 min-h-screen bg-[#F4F7F7]">
      <div className="max-w-7xl mx-auto flex gap-10">
        <div className="flex-1">
          <header className="mb-10 flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('list')}
              className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h2 className="text-3xl font-display font-extrabold text-primary mb-1">
                {editingCourse ? 'Manage Course' : 'Publish New Course'}
              </h2>
              <p className="text-text-secondary text-sm">
                {editingCourse ? 'Update details and manage videos.' : 'Upload your high-fidelity educational content.'}
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Step 1: Details */}
              <section className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-border-subtle p-8 h-fit">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold text-lg border border-primary/10">1</div>
                  <h3 className="text-xl font-display font-bold text-primary">Course Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Title</label>
                    <input 
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-slate-50/30" 
                      placeholder="e.g. Advanced AI Systems" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea 
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm bg-slate-50/30 min-h-[120px]" 
                      placeholder="Course overview..." 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-slate-200 rounded-xl py-3 px-4 text-sm bg-slate-50/30"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'admin').map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Level</label>
                      <select 
                        value={level}
                        onChange={(e) => setLevel(e.target.value as any)}
                        className="w-full border-slate-200 rounded-xl py-3 px-4 text-sm bg-slate-50/30"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Course Cover Image</label>
                    <div className="grid grid-cols-3 gap-3">
                      {/* Fixed Custom Upload Button */}
                      <div 
                        onClick={() => document.getElementById('cover-image-upload')?.click()}
                        className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-primary/50 transition-colors group"
                      >
                        <input
                          id="cover-image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Plus className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider group-hover:text-primary">Upload</span>
                      </div>

                      {/* Render custom uploaded images */}
                      {customImages.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setImageUrl(img)}
                          className={`aspect-video rounded-xl relative overflow-hidden cursor-pointer border-2 transition-all ${imageUrl === img ? 'border-secondary shadow-lg scale-[1.02]' : 'border-transparent'}`}
                        >
                          <img src={img} className="w-full h-full object-cover" />
                          {imageUrl === img && (
                            <div className="absolute top-1 right-1 bg-white rounded-full p-0.5">
                              <CheckCircle className="w-4 h-4 text-secondary fill-secondary" />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Presets */}
                      {[
                        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
                      ].map((preset, idx) => (
                        <div 
                          key={`preset-${idx}`}
                          onClick={() => setImageUrl(preset)}
                          className={`aspect-video rounded-xl relative overflow-hidden cursor-pointer border-2 transition-all ${imageUrl === preset ? 'border-secondary shadow-lg scale-[1.02]' : 'border-transparent'}`}
                        >
                          <img src={preset} className="w-full h-full object-cover" />
                          {imageUrl === preset && (
                            <div className="absolute top-1 right-1 bg-white rounded-full p-0.5">
                              <CheckCircle className="w-4 h-4 text-secondary fill-secondary" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Current Videos Section (Only in Edit Mode) */}
                {editingCourse && (
                  <section className="bg-white rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent-purple/5 flex items-center justify-center text-accent-purple font-bold text-lg border border-accent-purple/10">2</div>
                      <h3 className="text-xl font-display font-bold text-primary">Current Videos</h3>
                    </div>
                    <div className="space-y-4">
                      {editingCourse.sections.map(section => (
                        <div key={section.id} className="border border-slate-100 rounded-xl overflow-hidden">
                          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase">{section.title}</p>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {section.lessons.length === 0 && (
                              <p className="p-4 text-sm text-slate-400">No lessons in this module.</p>
                            )}
                            {section.lessons.map(lesson => (
                              <div key={lesson.id} className="p-4 flex items-center justify-between group hover:bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <PlayCircle className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-sm text-primary">{lesson.title}</p>
                                    <p className="text-xs text-slate-500">{lesson.duration} min {lesson.startTime !== undefined && `• (Segment: ${lesson.startTime}s - ${lesson.endTime}s)`}</p>
                                  </div>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => handleDeleteLesson(section.id, lesson.id)}
                                  className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Delete Lesson"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Video Upload Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary font-bold text-lg border border-secondary/10">
                        {editingCourse ? '3' : '2'}
                      </div>
                      <h3 className="text-xl font-display font-bold text-primary">
                        {editingCourse ? 'Add New Video' : 'Video Upload'}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div>
                        <p className="font-bold text-primary text-sm">🪄 Auto-Split Video into Sections (AI)</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Automatically generates chapters based on video content</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setAutoSplit(!autoSplit)}
                        className={`w-14 h-7 rounded-full relative transition-all ${autoSplit ? 'bg-primary' : 'bg-slate-300'}`}
                      >
                        <div className={`absolute top-1 bg-white w-5 h-5 rounded-full shadow-sm transition-all ${autoSplit ? 'left-8' : 'left-1'}`} />
                      </button>
                    </div>

                    {!autoSplit && (
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lesson Title</label>
                        <input 
                          required={!autoSplit && !editingCourse}
                          value={lessonTitle}
                          onChange={(e) => setLessonTitle(e.target.value)}
                          className="w-full border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-slate-50/30 shadow-inner" 
                          placeholder="e.g. Course Introduction" 
                        />
                      </div>
                    )}

                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                        isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-200 bg-slate-50/20'
                      } ${videoFile ? 'border-secondary bg-secondary/5' : ''}`}
                      onClick={() => !isUploading && document.getElementById('video-upload')?.click()}
                    >
                      <input 
                        id="video-upload"
                        type="file" 
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => { if(e.target.files) setVideoFile(e.target.files[0]) }}
                        disabled={isUploading}
                      />
                      
                      <div className={`w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mb-6 border transition-all ${
                        uploadStatus === 'done' ? 'bg-secondary text-white border-secondary' :
                        videoFile ? 'bg-primary/10 text-primary border-primary/20' : 
                        'bg-white text-slate-300 border-slate-100'
                      }`}>
                        {uploadStatus === 'done' ? <CheckCircle className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                      </div>

                      {isUploading ? (
                        <div className="w-full max-w-xs">
                          <p className="font-bold text-primary mb-3">Processing video...</p>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-secondary rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-secondary font-black uppercase tracking-widest mt-2">{uploadProgress}%</p>
                        </div>
                      ) : videoFile ? (
                        <div>
                          <p className="font-bold text-primary mb-1">📹 {videoFile.name}</p>
                          <p className="text-[10px] text-secondary font-black uppercase tracking-widest">
                            {(videoFile.size / (1024 * 1024)).toFixed(1)} MB · Ready to publish
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="font-bold text-primary mb-1">Drag and drop course video</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supports MP4, MOV, WEBM (Max 2GB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Publishing Options */}
            <section className="bg-white rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col mt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary font-bold text-lg border border-slate-100">
                  {editingCourse ? '4' : '3'}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-primary">Publishing Options</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1">Control when students can access</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPublishLater(false)}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      !publishLater ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!publishLater ? 'border-primary' : 'border-slate-300'}`}>
                        {!publishLater && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <span className={`font-bold ${!publishLater ? 'text-primary' : 'text-slate-600'}`}>Publish Immediately</span>
                    </div>
                    <p className="text-xs text-slate-500 pl-7">Course goes live as soon as it's processed</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPublishLater(true)}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      publishLater ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${publishLater ? 'border-primary' : 'border-slate-300'}`}>
                        {publishLater && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <span className={`font-bold ${publishLater ? 'text-primary' : 'text-slate-600'}`}>Schedule for Later</span>
                    </div>
                    <p className="text-xs text-slate-500 pl-7">Set a specific date and time for launch</p>
                  </button>
                </div>

                <AnimatePresence>
                  {publishLater && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    >
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Launch Date</label>
                          <CustomDatePicker 
                            selectedDate={publishDate} 
                            onSelect={setPublishDate} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Launch Time</label>
                          <div className="relative">
                            <input 
                              type="time"
                              required={publishLater}
                              value={publishTime}
                              onChange={(e) => setPublishTime(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer relative z-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                            <Clock className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {(publishDate && publishTime) && (
                        <div className="mt-4 p-4 bg-secondary/5 border border-secondary/20 rounded-xl flex items-center gap-3">
                          <Info className="w-5 h-5 text-secondary" />
                          <p className="text-xs text-secondary font-bold">
                            Course will be visible to students on <span className="underline">{publishDate}</span> at <span className="underline">{publishTime}</span>.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Finalize Step */}
            <section className="bg-white rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col sm:flex-row justify-between items-center gap-8 mt-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary font-bold text-lg border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary">Finalize</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1">Review content before saving</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                     type="submit"
                     disabled={isUploading || isAnalyzing || (!videoFile && !editingCourse)}
                     className="w-full sm:w-auto px-12 py-4 rounded-xl bg-secondary text-white font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transform hover:-translate-y-0.5 transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed"
                   >
                     {isAnalyzing ? 'Analyzing Video Content...' : 
                      isUploading ? `Uploading... ${uploadProgress}%` : 
                      editingCourse ? 'Save Changes' : publishLater ? 'Schedule Course' : 'Publish Course'}
                   </button>
               </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

const LS_KEY = 'brovai_courses';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'catalog' | 'dashboard' | 'course-view' | 'admin'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Load persisted courses from localStorage on first render
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed: Course[] = JSON.parse(saved);
        // Merge: saved courses first (most recent), then any MOCK courses not already present
        const savedIds = new Set(parsed.map(c => c.id));
        const merged = [...parsed, ...MOCK_COURSES.filter(c => !savedIds.has(c.id))];
        return merged;
      }
    } catch { /* ignore parse errors */ }
    return MOCK_COURSES;
  });

  useEffect(() => {
    const hydrateVideos = async () => {
      let changed = false;
      const hydratedCourses = await Promise.all(courses.map(async (course) => {
        const hydratedSections = await Promise.all(course.sections.map(async (section) => {
          const hydratedLessons = await Promise.all(section.lessons.map(async (lesson) => {
            if (lesson.videoId && (!lesson.videoUrl || lesson.videoUrl.startsWith('blob:') === false)) {
              try {
                const file = await idbGet<File>(lesson.videoId);
                if (file) {
                  changed = true;
                  return { ...lesson, videoUrl: URL.createObjectURL(file) };
                }
              } catch (err) {
                console.error("Failed to load video from IndexedDB", err);
              }
            }
            return lesson;
          }));
          return { ...section, lessons: hydratedLessons };
        }));
        return { ...course, sections: hydratedSections };
      }));
      if (changed) {
        setCourses(hydratedCourses);
      }
    };
    hydrateVideos();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course-view');
    window.scrollTo(0, 0);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prev => {
      const next = prev.map(c => c.id === updatedCourse.id ? updatedCourse : c);
      try {
        const toSave = next.map(c => ({
          ...c,
          sections: c.sections.map(s => ({
            ...s,
            lessons: s.lessons.map(l => ({ ...l, videoUrl: l.videoUrl?.startsWith('blob:') ? undefined : l.videoUrl }))
          }))
        }));
        localStorage.setItem(LS_KEY, JSON.stringify(toSave));
      } catch { /* ignore */ }
      return next;
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => {
      const next = prev.filter(c => c.id !== courseId);
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => {
      const next = [newCourse, ...prev];
      // Persist to localStorage (skip videoUrl blob — it's session-only)
      try {
        const toSave = next.map(c => ({
          ...c,
          sections: c.sections.map(s => ({
            ...s,
            lessons: s.lessons.map(l => ({ ...l, videoUrl: l.videoUrl?.startsWith('blob:') ? undefined : l.videoUrl }))
          }))
        }));
        localStorage.setItem(LS_KEY, JSON.stringify(toSave));
      } catch { /* storage full or private mode */ }
      return next;
    });
    setCurrentPage('catalog');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onHomeClick={() => setCurrentPage('catalog')} 
        onAdminClick={() => setCurrentPage('admin')}
        currentPage={currentPage}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'catalog' && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CatalogPage 
              courses={courses}
              onSelectCourse={handleSelectCourse} 
            />
          </motion.div>
        )}

        {currentPage === 'course-view' && selectedCourse && (
          <motion.div
            key="course-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CoursePlayerPage 
              course={selectedCourse} 
              onBack={() => setCurrentPage('catalog')} 
            />
          </motion.div>
        )}

        {currentPage === 'admin' && IS_ADMIN_ENABLED && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AdminPanel courses={courses} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} onDeleteCourse={handleDeleteCourse} />
          </motion.div>
        )}
      </AnimatePresence>

      {currentPage !== 'course-view' && currentPage !== 'admin' && <Footer />}
    </div>
  );
}
