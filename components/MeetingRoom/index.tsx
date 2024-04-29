'use client';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  Call,
} from '@stream-io/video-react-sdk';
import toast from 'react-hot-toast';
import { Users, LayoutList, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from '@/components/EndCallButton';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
const MeetingRoom = () => {
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const call = useCall();

  const router = useRouter();
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');

  const CopyLink = () => {
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call?.id}`;
    navigator.clipboard.writeText(meetingLink);
    toast('链接复制成功！', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#1C1F2E',
        color: '#fff',
      },
    });
  };
  const VideoLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <VideoLayout />
      <div
        className={cn('h-screen bg-dark-1 absolute right-0 top-0 px-6 ', {
          hidden: !showParticipants,
        })}
      >
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
      </div>
      <div className="fixed bottom-0 flex w-full justify-center items-center gap-4">
        <CallControls
          onLeave={() => {
            router.push('/');
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LayoutList />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {/*<DropdownMenuLabel>布局</DropdownMenuLabel>*/}
            {[
              { lable: '网格', value: 'grid' },
              {
                lable: '靠左',
                value: 'speaker-left',
              },
              { lable: '靠右', value: 'speaker-right' },
            ].map((item) => {
              return (
                <div key={item.lable}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.value.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item.lable}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Users
          size={24}
          onClick={() => setShowParticipants(!showParticipants)}
        />
        <Button
          onClick={() => {
            CopyLink();
          }}
          className="bg-green-600"
        >
          <Copy />
          <p className="ml-2"> 邀请</p>
        </Button>

        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
