import { useState } from 'react';

interface Criterion {
  id: string;
  label: string;
  description: string;
  rating: number;
}

export default function EvaluationTab() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: 'research', label: 'Research Quality', description: 'Originality, significance, and rigor of research work', rating: 0 },
    { id: 'methodology', label: 'Methodology', description: 'Appropriateness and execution of research methods', rating: 0 },
    { id: 'literature', label: 'Literature Review', description: 'Depth and breadth of knowledge in the field', rating: 0 },
    { id: 'analysis', label: 'Data Analysis', description: 'Quality of data analysis and interpretation', rating: 0 },
    { id: 'writing', label: 'Writing & Communication', description: 'Clarity and quality of written and oral communication', rating: 0 },
    { id: 'progress', label: 'Progress & Productivity', description: 'Timeliness of milestones and overall productivity', rating: 0 },
    { id: 'independence', label: 'Independence', description: 'Ability to work independently and solve problems', rating: 0 },
    { id: 'collaboration', label: 'Collaboration', description: 'Teamwork and contribution to lab community', rating: 0 },
  ]);

  const [overallComments, setOverallComments] = useState('');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [saved, setSaved] = useState(false);

  const handleRating = (id: string, rating: number) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, rating } : c));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getRatingColor = (rating: number) => {
    if (rating === 0) return 'bg-slate-100 text-slate-400 border-slate-200';
    if (rating <= 2) return 'bg-red-50 text-red-600 border-red-200';
    if (rating <= 3) return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    if (rating === 4) return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-green-50 text-green-600 border-green-200';
  };

  const getAverageRating = () => {
    const rated = criteria.filter(c => c.rating > 0);
    if (rated.length === 0) return 0;
    return (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1);
  };

  const ratingLabels = ['', 'Poor', 'Below Average', 'Satisfactory', 'Good', 'Excellent'];

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">PhD Student Evaluation</h2>
            <p className="text-sm text-slate-500 mt-1">Rate the student on each criterion below (1–5 scale)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <p className="text-2xl font-bold text-blue-700">{getAverageRating()}</p>
              <p className="text-xs text-slate-500">Average Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="grid gap-4">
        {criteria.map((criterion, index) => (
          <div key={criterion.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">#{index + 1}</span>
                  <h3 className="font-semibold text-slate-800">{criterion.label}</h3>
                </div>
                <p className="text-sm text-slate-500 mt-1">{criterion.description}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(criterion.id, star)}
                    className={`w-9 h-9 rounded-lg border text-sm font-medium transition-all duration-150 ${
                      star <= criterion.rating
                        ? getRatingColor(criterion.rating)
                        : 'bg-slate-50 text-slate-300 border-slate-200 hover:bg-slate-100 hover:text-slate-500'
                    }`}
                    title={ratingLabels[star]}
                  >
                    {star}
                  </button>
                ))}
                {criterion.rating > 0 && (
                  <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${getRatingColor(criterion.rating)}`}>
                    {ratingLabels[criterion.rating]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Written Feedback
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Strengths</label>
          <textarea
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="What does the student do well?"
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Areas for Improvement</label>
          <textarea
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="What areas need development?"
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Overall Comments</label>
          <textarea
            value={overallComments}
            onChange={(e) => setOverallComments(e.target.value)}
            placeholder="General observations and recommendations..."
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {saved ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved Successfully
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Evaluation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
