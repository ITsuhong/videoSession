'use client';

import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const MeetingSetUp = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { camera, isMute: isCameraMuted } = useCameraState();
  const { microphone, isMute: isMicrophoneMuted } = useMicrophoneState();
  const [isCamToggled, setIsCamToggled] = useState(!isCameraMuted);
  const [isMicToggled, setIsMicToggled] = useState(!isMicrophoneMuted);
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }
  useEffect(() => {
    if (isCamToggled) {
      call.camera.enable();
      // call.microphone.enable();
    } else {
      call.camera.disable();
      // call.microphone.disable();
    }
  }, [isCamToggled, call.camera, call.microphone]);
  useEffect(() => {
    if (isMicToggled) {
      call.microphone.enable();
      // call.microphone.enable();
    } else {
      call.microphone.disable();
      // call.microphone.disable();
    }
  }, [isMicToggled, call.camera, call.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isCamToggled}
            onChange={(e) => setIsCamToggled(e.target.checked)}
          />
          打开摄像头
        </label>
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicToggled}
            onChange={(e) => setIsMicToggled(e.target.checked)}
          />
          打开麦克风
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        加入会议
      </Button>
    </div>
  );
};
export default MeetingSetUp;
