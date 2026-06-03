import { useState } from "react";
import { animate } from "framer-motion";
import PageTransition from "./PageTransition";

export default function App() {
  const [progress,setProgress] = useState(0);

  const navigateWithTransition = async () => {

    animate(
      progress,
      1,
      {
        duration:1.2,
        onUpdate:setProgress
      }
    );

    setTimeout(() => {

      // route change here

    },600);

    setTimeout(() => {
      setProgress(0);
    },1200);
  };

  return (
    <>
      <PageTransition
        progress={progress}
        logo="/logo.svg"
      />

      <button
        onClick={navigateWithTransition}
      >
        Navigate
      </button>
    </>
  );
}
