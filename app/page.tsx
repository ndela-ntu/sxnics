import Head from "next/head";
import RadioPlayer from "../components/RadioPlayer";

const Home: React.FC = () => {
  return (
    <main className="bg-black h-screen flex items-center justify-center">
      <RadioPlayer />
    </main>
  );
};

export default Home;
