import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        {/*<Sidebar/>*/}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-10">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};
export default HomeLayout;
