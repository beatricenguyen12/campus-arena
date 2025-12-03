import { ReactNode } from 'react';

import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
  onContactUs: () => void;
  showHeader?: boolean;
}

export function AppLayout({
  children,
  onContactUs,
  showHeader = true,
}: AppLayoutProps) {
  return (
    <>
      {showHeader && (
        <Header
          onContactUs={onContactUs}
        />
      )}
      <main>{children}</main>
    </>
  );
}
