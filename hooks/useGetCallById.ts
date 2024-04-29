import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string) => {
  const [call, setCall] = useState<Call>();
  const client = useStreamVideoClient();
  const [isCallLoading, setIsCallLoading] = useState(true);
  useEffect(() => {
    if (!client || !id) return;
    const loadCal = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) {
          console.log(calls, 'call');
          setCall(calls[0]);
          setIsCallLoading(true);
        } else {
          setIsCallLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsCallLoading(false);
      }
    };
    loadCal();
  }, [client, id]);
  return {
    call,
    isCallLoading,
  };
  // const {call}=
};
