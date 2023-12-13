import dynamic from 'next/dynamic';

const DynamicChat = dynamic(() => import('./DynamicChat'), { ssr: false });

const Chat = () => {
  return <DynamicChat />;
};

export default Chat;