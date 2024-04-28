'use client';

import Image from 'next/image';
import HomeCard from './HomeCard';
import MeetingCard from '@/components/MeetingCard';
import MeetingModal from '@/components/MeetingModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStreamVideoClient, Call } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
// import { Call } from '@stream-io/node-sdk';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const createMeeting = async () => {
    if (!client || !user) return;
    if (!values.dateTime) {
      // toast({ title: 'Please select a date and time' });
      return;
    }
    const id = crypto.randomUUID();
    const call = client.call('default', id);
    if (!call) throw new Error('Failed to create meeting');
    const startsAt =
      values.dateTime.toISOString() || new Date(Date.now()).toISOString();
    const description = values.description || 'Instant Meeting';
    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description,
        },
      },
    });
    setCallDetail(call);
    router.push(`/meeting/${call.id}`);
  };
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-4">
        <HomeCard
          img="/icons/add-meeting.svg"
          title="新建会议"
          description="Setup a new recording"
          className="bg-[#ff742e]"
          handleClick={() => {
            setMeetingState('isInstantMeeting');
          }}
        />
        <HomeCard
          img="/icons/join-meeting.svg"
          title="加入会议"
          description="via invitation link"
          className="bg-[#0e78f9]"
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="安排会议"
          description="Plan your meeting"
          className="bg-[#820ef8]"
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="会议记录"
          description="Meeting recordings"
          className="bg-[#f9a90e]"
        />
      </div>
      {/*<div className="grid grid-cols-2 gap-5 ">*/}
      {/*    <MeetingCard/>*/}
      {/*</div>*/}
      <MeetingModal
        handleClick={() => {
          createMeeting();
        }}
        title="Start an Instant Meeting"
        buttonText="Create Meeting"
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => {
          setMeetingState(undefined);
        }}
      />
    </section>
  );
};
export default MeetingTypeList;
