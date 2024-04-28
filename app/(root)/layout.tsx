import StreamClientProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <StreamClientProvider> {children}</StreamClientProvider>
    </main>
  );
};
export default RootLayout;
