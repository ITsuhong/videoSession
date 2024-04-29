import MeetingCard from '@/components/MeetingCard';
import { useGetCalls } from '@/hooks/useGetCalls';
import Loader from '@/components/Loader';

const CallList = () => {
  const { progressMeets } = useGetCalls();
  console.log(progressMeets, 'progressMeets');
  if (progressMeets.length < 0) return <Loader />;
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {progressMeets.map((item) => {
        return <MeetingCard type="progress" call={item} key={item.id} />;
      })}
    </section>
  );
};
export default CallList;
