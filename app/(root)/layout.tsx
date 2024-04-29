import StreamClientProvider from '@/providers/StreamClientProvider';
import '@stream-io/video-react-sdk/dist/css/styles.css';
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <StreamClientProvider> {children}</StreamClientProvider>
    </main>
  );
};
export default RootLayout;
