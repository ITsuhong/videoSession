'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react';
import { CallRecording } from '@stream-io/video-client';
import MeetingBack from '@/components/MeetingBack';
import toast from 'react-hot-toast';

const PlayBackPage = () => {
  const { calls } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  useEffect(() => {
    try {
      const fetchRecordIng = async () => {
        if (calls && calls.length > 0) {
          const callsData = await Promise.all(
            calls?.map((item) => item.queryRecordings()),
          );
          const recordings = callsData
            .filter((call) => call.recordings.length > 0)
            .flatMap((call) => call.recordings);
          setRecordings(recordings);
          console.log(recordings, 111);
        }
      };
      fetchRecordIng();
    } catch (e) {
      toast.error('请重新获取');
    }
  }, [calls]);
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">会议回放</h1>
      {/*<CallList />*/}
      <div className="flex flex-col gap-4">
        {recordings.map((item) => {
          return <MeetingBack callRecording={item} key={item.url} />;
        })}
      </div>
    </section>
  );
};

export default PlayBackPage;
