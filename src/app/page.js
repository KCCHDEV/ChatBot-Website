// pages/index.js
import dynamic from 'next/dynamic';

const DynamicHome = dynamic(() => import('./components/Chat'), { ssr: false });

const Home = () => {
  return (
    <div>
      <h1>My Next.js Chatbot</h1>
      <DynamicHome />
    </div>
  );
};

export default Home;
