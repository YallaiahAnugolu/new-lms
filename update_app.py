import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Add state variables to AdminPanel
state_vars_old = "  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');\n  // Keep blob URL alive for the session\n  const videoBlobUrlRef = React.useRef<string | null>(null);"
state_vars_new = """  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [autoSplit, setAutoSplit] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Keep blob URL alive for the session
  const videoBlobUrlRef = React.useRef<string | null>(null);"""
content = content.replace(state_vars_old, state_vars_new)

# 2. Modify handleSubmit
handle_submit_old = """    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      level,
      image: imageUrl,
      instructor: 'Dr. Sarah Jenkins',
      rating: 5.0,
      lessonsCount: 1,
      sections: [
        {
          id: 's1',
          title: 'Module 1: Introduction',
          lessons: [
            { 
              id: 'l1', 
              title: lessonTitle || 'Welcome to the Course', 
              duration: '8:35', 
              isCompleted: false,
              videoUrl
            }
          ]
        }
      ]
    };

    await new Promise(r => setTimeout(r, 400)); // let user see 100%
    setIsUploading(false);
    onAddCourse(newCourse);"""

handle_submit_new = """    let generatedLessons = [
      { 
        id: 'l1', 
        title: lessonTitle || 'Welcome to the Course', 
        duration: '8:35', 
        isCompleted: false,
        videoUrl
      }
    ];

    if (autoSplit) {
      setIsAnalyzing(true);
      // Simulate API call to AI service
      await new Promise(r => setTimeout(r, 3000));
      generatedLessons = [
        { id: 'l1', title: 'Introduction & Setup', duration: '2:00', isCompleted: false, videoUrl, startTime: 0, endTime: 120 },
        { id: 'l2', title: 'Core Concepts', duration: '5:00', isCompleted: false, videoUrl, startTime: 120, endTime: 420 },
        { id: 'l3', title: 'Practical Examples', duration: '1:35', isCompleted: false, videoUrl, startTime: 420, endTime: 515 },
      ];
      setIsAnalyzing(false);
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
      sections: [
        {
          id: 's1',
          title: 'Module 1: Complete Content',
          lessons: generatedLessons
        }
      ]
    };

    await new Promise(r => setTimeout(r, 400)); // let user see 100%
    setIsUploading(false);
    onAddCourse(newCourse);"""
content = content.replace(handle_submit_old, handle_submit_new)


# 3. Add Auto-Split toggle in Admin Panel
auto_split_toggle_old = """                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">First Lesson Title</label>
                      <input 
                        required
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        className="w-full border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-slate-50/30 shadow-inner" 
                        placeholder="e.g. Course Introduction" 
                      />
                    </div>"""

auto_split_toggle_new = """                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
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
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">First Lesson Title</label>
                        <input 
                          required={!autoSplit}
                          value={lessonTitle}
                          onChange={(e) => setLessonTitle(e.target.value)}
                          className="w-full border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-slate-50/30 shadow-inner" 
                          placeholder="e.g. Course Introduction" 
                        />
                      </div>
                    )}"""
content = content.replace(auto_split_toggle_old, auto_split_toggle_new)

# 4. Update the Submit button logic
submit_btn_old = """                   <button
                     type="submit"
                     disabled={isUploading}
                     className="w-full sm:w-auto px-12 py-4 rounded-xl bg-secondary text-white font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transform hover:-translate-y-0.5 transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed"
                   >
                     {isUploading ? `Uploading... ${uploadProgress}%` : publishLater ? 'Schedule Course Publication' : 'Publish Course to Catalog'}
                   </button>"""

submit_btn_new = """                   <button
                     type="submit"
                     disabled={isUploading || isAnalyzing}
                     className="w-full sm:w-auto px-12 py-4 rounded-xl bg-secondary text-white font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transform hover:-translate-y-0.5 transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed"
                   >
                     {isAnalyzing ? 'Analyzing Video Content...' : isUploading ? `Uploading... ${uploadProgress}%` : publishLater ? 'Schedule Course Publication' : 'Publish Course to Catalog'}
                   </button>"""
content = content.replace(submit_btn_old, submit_btn_new)


# 5. Fix Cover Image Button
cover_image_old = """                      <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group">
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Custom</span>
                      </div>"""

cover_image_new = """                      <div 
                        onClick={() => document.getElementById('cover-image-upload')?.click()}
                        className={`aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group ${!imageUrl.includes('photo') && imageUrl ? 'border-secondary shadow-lg scale-[1.02] p-0 overflow-hidden' : ''}`}
                      >
                        <input
                          id="cover-image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setImageUrl(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                        {(!imageUrl.includes('photo') && imageUrl) ? (
                          <img src={imageUrl} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Custom</span>
                          </>
                        )}
                      </div>"""
content = content.replace(cover_image_old, cover_image_new)

# 6. Update Video Player to support startTime and endTime
# Currently, it initializes with:
#   useEffect(() => { ... video starts playing ... })
# We need to set currentTime to startTime initially, and check if currentTime >= endTime to pause.

video_useeffect_old = """  useEffect(() => {
    if (activeLesson?.videoUrl && videoRef.current) {
      // Force reload the video
      videoRef.current.load();
      // Try to auto-play
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(false);
    }
  }, [activeLessonId, activeLesson?.videoUrl]);"""

video_useeffect_new = """  useEffect(() => {
    if (activeLesson?.videoUrl && videoRef.current) {
      // Force reload the video
      videoRef.current.load();
      if (activeLesson.startTime) {
        videoRef.current.currentTime = activeLesson.startTime;
      }
      // Try to auto-play
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(false);
    }
  }, [activeLessonId, activeLesson?.videoUrl]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (activeLesson?.endTime && videoRef.current.currentTime >= activeLesson.endTime) {
         videoRef.current.pause();
         setIsPlaying(false);
      }
    }
  };"""

content = content.replace(video_useeffect_old, video_useeffect_new)

# Replace the onTimeUpdate in the video element
video_elem_old = """                  onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}"""
video_elem_new = """                  onTimeUpdate={handleTimeUpdate}"""
content = content.replace(video_elem_old, video_elem_new)


with open("src/App.tsx", "w") as f:
    f.write(content)
print("Updated App.tsx successfully")
