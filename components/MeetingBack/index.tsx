import Image from 'next/image';
import { avatarImages } from '@/app/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useGetCalls } from '@/hooks/useGetCalls';
import {
  Call,
  useStreamVideoClient,
  CallRecording,
} from '@stream-io/video-react-sdk';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type MeetingType = 'playback' | 'start' | 'progress';
// type MeetingType=
const MeetingCard = ({ callRecording }: { callRecording: CallRecording }) => {
  const client = useStreamVideoClient();
  const router = useRouter();

  const description = callRecording?.filename;
  const startTime = dayjs(callRecording?.start_time).format(
    'YYYY-MM-DD HH:mm:ss',
  );

  const CopyLink = () => {
    const meetingLink = callRecording.url;
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
  const Play = () => {
    router.push(callRecording.url);
  };
  return (
    <section className="p-4 rounded-xl bg-[#1c1f2e] text-white">
      <Image src="/icons/upcoming.svg" alt="" width={15} height={15}></Image>
      <h1 className="text-[15px] mt-3 font-semibold">{description}</h1>
      <h1 className="text-[12px] mt-2 ">{startTime}</h1>
      <div className="mt-5 flex justify-between">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={30}
              height={30}
              className={cn('rounded-full', { absolute: index > 0 })}
              style={{ top: 0, left: index * 25 }}
            />
          ))}
          <div className="flex-center absolute left-[126px] size-8 rounded-full bg-dark-4">
            +5
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              Play();
            }}
            className="bg-green-500"
            size="sm"
          >
            播放录像
          </Button>
          <Button
            onClick={() => {
              CopyLink();
            }}
            className="bg-dark-3"
            size="sm"
          >
            <Copy size={18} />
            <p className="ml-1">分享链接</p>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetingCard;
