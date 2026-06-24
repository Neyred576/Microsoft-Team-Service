import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Microsoft Team Services - Business Plans & Subscriptions',
  description: 'Discover Microsoft Team Services business plans and pricing. Find the right enterprise solution for your organization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
