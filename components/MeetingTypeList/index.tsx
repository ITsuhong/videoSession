'use client';

import Image from 'next/image';
import HomeCard from './HomeCard';
import toast from 'react-hot-toast';
import MeetingCard from '@/components/MeetingCard';
import MeetingModal from '@/components/MeetingModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStreamVideoClient, Call } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
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
  const [meetingLink, setMeetingLink] = useState('');
  const [nowMeetingDes, SetNowMeetingDes] = useState('');
  const createMeeting = async () => {
    const toastId = toast.loading('创建中...');
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
    const description = nowMeetingDes || 'Instant Meeting';
    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description,
        },
      },
    });
    setCallDetail(call);
    toast.dismiss();
    toast('创建成功', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    router.push(`/meeting/${call.id}`);
  };
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-4">
        <HomeCard
          img="/icons/add-meeting.svg"
          title="即时会议"
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
          handleClick={() => {
            setMeetingState('isJoiningMeeting');
          }}
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
          handleClick={() => {
            router.push('/recordings');
          }}
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="会议回放"
          description="Meeting recordings"
          className="bg-[#4cd137]"
          handleClick={() => {
            router.push('/playback');
          }}
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
        buttonText="创建&进入会议"
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => {
          setMeetingState(undefined);
        }}
      >
        <Input
          placeholder="会议描述"
          onChange={(e) => {
            SetNowMeetingDes(e.target.value);
            // console.log(e.target.value);
          }}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
      <MeetingModal
        handleClick={() => {
          // createMeeting();
          router.push(meetingLink);
        }}
        title="Join a Meeting"
        buttonText="加入会议"
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => {
          setMeetingState(undefined);
        }}
      >
        <Input
          placeholder="会议链接"
          onChange={(e) => {
            setMeetingLink(e.target.value);
            // console.log(e.target.value);
          }}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};
export default MeetingTypeList;
