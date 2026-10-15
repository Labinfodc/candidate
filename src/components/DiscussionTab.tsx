import { useState } from 'react';

interface DiscussionEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  type: 'meeting' | 'feedback' | 'action' | 'general';
}

export default function DiscussionTab() {
  const [entries, setEntries] = useState<DiscussionEntry[]>([
    {
      id: '1',
      date: '2024-12-15',
      title: 'Weekly Lab Meeting',
      content: 'Discussed progress on Chapter 3. Student needs to refine the methodology section and include more recent references. Next deadline: draft submission by end of month.',
      type: 'meeting',
    },
    {
      id: '2',
      date: '2024-12-10',
      title: 'Paper Revision Feedback',
      content: 'Reviewers have requested additional experiments for the supplementary data. Plan to address comments 2 and 4 in the revision. Student should focus on the statistical analysis improvements.',
      type: 'feedback',
    },
    {
      id: '3',
      date: '2024-12-05',
      title: 'Conference Preparation',
      content: 'Student selected to present at the annual conference. Need to prepare slides and poster. Practice presentation scheduled for next week.',
      type: 'action',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<DiscussionEntry['type']>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const handleAddEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const entry: DiscussionEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      content: newContent,
      type: newType,
    };

    setEntries([entry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setNewType('general');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'meeting':
        return { label: 'Meeting', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '👥' };
      case 'feedback':
        return { label: 'Feedback', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '💬' };
      case 'action':
        return { label: 'Action Item', color: 'bg-green-50 text-green-700 border-green-200', icon: '✅' };
      default:
        return { label: 'General', color: 'bg-slate-50 text-slate-700 border-slate-200', icon: '📝' };
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Discussion Notes</h2>
            <p className="text-sm text-slate-500 mt-1">Track meetings, feedback, and action items</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Entry
          </button>
        </div>
      </div>

      {/* New Entry Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-sm animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Discussion Entry</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter discussion title..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as DiscussionEntry['type'])}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all bg-white"
                >
                  <option value="general">📝 General</option>
                  <option value="meeting">👥 Meeting</option>
                  <option value="feedback">💬 Feedback</option>
                  <option value="action">✅ Action Item</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your discussion notes..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                disabled={!newTitle.trim() || !newContent.trim()}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-purple-500/25"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        >
          <option value="all">All Types</option>
          <option value="meeting">👥 Meetings</option>
          <option value="feedback">💬 Feedback</option>
          <option value="action">✅ Action Items</option>
          <option value="general">📝 General</option>
        </select>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-500 font-medium">No discussion entries found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or add a new entry</p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const typeConfig = getTypeConfig(entry.type);
            return (
              <div key={entry.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${typeConfig.color}`}>
                        <span>{typeConfig.icon}</span>
                        {typeConfig.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">{entry.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{entry.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete entry"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Entry count */}
      {filteredEntries.length > 0 && (
        <p className="text-center text-xs text-slate-400">
          Showing {filteredEntries.length} of {entries.length} entries
        </p>
      )}
    </div>
  );
}
