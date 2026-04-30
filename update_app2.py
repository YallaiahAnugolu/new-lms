import re

with open("src/App.tsx", "r") as f:
    original = f.read()

with open("/Users/chinna/.gemini/antigravity/brain/21c7ef29-329e-4f14-81dd-4f1291d01119/scratch/admin_panel.tsx", "r") as f:
    new_admin_panel = f.read()

# Find the indices
admin_start = original.find("// --- Admin Panel Component ---")
main_app_start = original.find("// --- Main App Component ---")

if admin_start == -1 or main_app_start == -1:
    print("Could not find markers in App.tsx")
    exit(1)

prefix = original[:admin_start]
suffix = original[main_app_start:]

# Modify the suffix (Main App Component)
# Add handleUpdateCourse and handleDeleteCourse
handle_add_course_end = suffix.find("  const handleAddCourse = (newCourse: Course) => {")
# We will inject the new handlers right before handleAddCourse

new_handlers = """  const handleUpdateCourse = (updatedCourse: Course) => {
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

"""

suffix = suffix[:handle_add_course_end] + new_handlers + suffix[handle_add_course_end:]

# Modify the AdminPanel rendering in suffix
old_admin_render = "<AdminPanel onAddCourse={handleAddCourse} />"
new_admin_render = "<AdminPanel courses={courses} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} onDeleteCourse={handleDeleteCourse} />"
suffix = suffix.replace(old_admin_render, new_admin_render)

# Combine everything
final_code = prefix + new_admin_panel + "\n\n" + suffix

with open("src/App.tsx", "w") as f:
    f.write(final_code)

print("Updated App.tsx successfully")
