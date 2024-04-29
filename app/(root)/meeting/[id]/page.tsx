'use client';
import {
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
  CallControls,
  SpeakerLayout,
} from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';
import { useState } from 'react';
import MeetingSetUp from '@/components/MeetingSetUp';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id as string);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  if (!isLoaded || !isCallLoading) return <Loader></Loader>;
  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetUp
              setIsSetupComplete={(value) => setIsSetupComplete(value)}
            />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
