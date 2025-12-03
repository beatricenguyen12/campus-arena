import { useMemo, useState } from 'react';

import { TalkQuestion } from '@/types';

export function useSearch(questions: TalkQuestion[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedSearch) return questions;

    return questions.filter(
      (q) =>
        q.title.toLowerCase().includes(normalizedSearch) ||
        (q.body ?? '').toLowerCase().includes(normalizedSearch) ||
        (q.answers ?? []).some((a) =>
          a.content.toLowerCase().includes(normalizedSearch),
        ),
    );
  }, [normalizedSearch, questions]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching: Boolean(normalizedSearch),
  };
}
