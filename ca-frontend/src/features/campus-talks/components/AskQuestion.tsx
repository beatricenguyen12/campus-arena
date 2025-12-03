import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

interface AskQuestionProps {
  onBack: () => void;
  onSubmit: (title: string, body: string) => void;
  onShowSnackbar: (message: string, type: 'success' | 'error') => void;
}

export function AskQuestion({
  onBack,
  onSubmit,
  onShowSnackbar,
}: AskQuestionProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = 'ask-question-title';
  const bodyId = 'ask-question-body';

  const handleSubmit = () => {
    if (!title.trim()) {
      onShowSnackbar('Please enter a question title', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(title, body);
      setIsSubmitting(false);
      onShowSnackbar('Your question has been posted successfully!', 'success');
    }, 500);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FC]">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div
            className="bg-white rounded-[12px] p-6"
            style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)' }}
          >
            <h2 className="text-[#1A1A1A] mb-6">Ask a Question</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-[#1A1A1A] mb-2" htmlFor={titleId}>
                  Title <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id={titleId}
                  type="text"
                  placeholder="Enter your question title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 rounded-[10px] border border-[#E5E7EB] focus:outline-none focus:border-[#2A56FF] transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-2" htmlFor={bodyId}>
                  Body (Optional)
                </label>
                <textarea
                  id={bodyId}
                  placeholder="Add more details about your question..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-2 rounded-[10px] border border-[#E5E7EB] focus:outline-none focus:border-[#2A56FF] transition-colors disabled:opacity-50 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-[#2A56FF] text-white rounded-[10px] hover:bg-[#1e42d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Question'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
