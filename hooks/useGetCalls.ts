import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [progressMeets, setProgressMeets] = useState<Call[]>([]);
  const [endMeets, setEndMeets] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        const meetings = calls.filter((item) => !item.state.endedAt);
        const endMeetings = calls.filter((item) => item.state.endedAt);
        setEndMeets(endMeetings);
        setProgressMeets(meetings);

        console.log(calls[0].state.startsAt, 'start');
        console.log(calls[0].state.endedAt, 'endedAt');
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);
  return {
    calls,
    isLoading,
    progressMeets,
    endMeets,
  };
};
