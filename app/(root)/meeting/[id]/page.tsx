'use client';

import { useParams } from 'next/navigation';

const MeetingPage = () => {
  const { id } = useParams();
  return <div>{id}123</div>;
};

export default MeetingPage;
