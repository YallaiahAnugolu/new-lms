import re

with open("src/App.tsx", "r") as f:
    original = f.read()

# Insert the CustomDatePicker component before AdminPanel
custom_calendar_code = """
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
                const isSelected = selectedDate && date.toISOString().split('T')[0] === selectedDate;
                const isToday = date.getTime() === today.getTime();

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      onSelect(date.toISOString().split('T')[0]);
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
"""

admin_panel_start = original.find("const AdminPanel =")
if admin_panel_start == -1:
    print("Could not find AdminPanel")
    exit(1)

prefix = original[:admin_panel_start]
suffix = original[admin_panel_start:]

# Replace the Date Input in the suffix
old_date_input = """                          <div className="relative">
                            <input 
                              type="date"
                              required={publishLater}
                              min={new Date().toISOString().split('T')[0]}
                              value={publishDate}
                              onChange={(e) => setPublishDate(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer relative z-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                            <Calendar className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>"""

new_date_input = """                          <CustomDatePicker 
                            selectedDate={publishDate} 
                            onSelect={setPublishDate} 
                          />"""

suffix = suffix.replace(old_date_input, new_date_input)

with open("src/App.tsx", "w") as f:
    f.write(prefix + custom_calendar_code + "\n" + suffix)

print("Calendar updated")
