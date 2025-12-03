import { ReactNode } from 'react';

interface TabRouterProps {
  activeTab: 'splash' | 'campus-talks';
  splash: ReactNode;
  campusTalks: ReactNode;
}

export function TabRouter({ activeTab, splash, campusTalks }: TabRouterProps) {
  if (activeTab === 'splash') return <>{splash}</>;
  if (activeTab === 'campus-talks') return <>{campusTalks}</>;
  return null;
}
