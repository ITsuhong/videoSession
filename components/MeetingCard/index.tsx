import Image from 'next/image';
import { avatarImages } from '@/app/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

const MeetingCard = ({ call }: { call: Call }) => {
  const client = useStreamVideoClient();
  // const channel = client.channel('messaging', channelId);
  console.log(client, 'client');
  console.log(call, 'call');
  call.queryMembers().then((res) => {
    console.log(res, call, 111);
  });

  return (
    <section className="p-4 rounded-xl bg-[#1c1f2e] text-white">
      <Image src="/icons/upcoming.svg" alt="" width={15} height={15}></Image>
      <h1 className="text-[15px] mt-3 font-semibold">
        Team Sync:Spring Planning & Updates
      </h1>
      <h1 className="text-[12px] mt-2 ">March 15,2024-10:00AM</h1>
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
          <Button className="bg-green-500" size="sm">
            加入会议
          </Button>
          <Button className="bg-dark-3" size="sm">
            <Copy size={18} />
            <p className="ml-1">复制链接</p>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetingCard;
