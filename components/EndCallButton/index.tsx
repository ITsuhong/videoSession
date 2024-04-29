'use client';

import { Button } from '@/components/ui/button';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const { useLocalParticipant } = useCallStateHooks();
  const call = useCall();
  const localParticipant = useLocalParticipant();
  const isLocalParticipant =
    localParticipant?.userId === call?.state.createdBy?.id;
  console.log(call?.state.createdBy?.id, 'state');
  console.log(localParticipant?.userId, 'local');
  const router = useRouter();
  const endCall = async () => {
    if (!call)
      throw new Error(
        'useStreamCall must be used within a StreamCall component.',
      );
    await call.endCall();
    router.push('/');
  };
  return (
    <div>
      {isLocalParticipant && (
        <Button onClick={endCall} className="bg-red-500">
          结束会议
        </Button>
      )}
    </div>
  );
};
export default EndCallButton;
