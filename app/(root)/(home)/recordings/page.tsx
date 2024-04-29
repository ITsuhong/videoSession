'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import CallList from '@/components/CallList';

const RecordPage = () => {
  const { calls } = useGetCalls();
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">会议列表</h1>
      <CallList />
    </section>
  );
};
export default RecordPage;
