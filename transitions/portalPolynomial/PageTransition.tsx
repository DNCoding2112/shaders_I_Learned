import { motion } from "framer-motion";
import TransitionShader from "./Shader";

interface Props {
  progress: number;
  logo: string;
}

export default function PageTransition({
  progress,
  logo
}: Props) {
  return (
    <>
      <TransitionShader progress={progress} />

      <motion.img
        src={logo}
        className="fixed
                   top-1/2
                   left-1/2
                   -translate-x-1/2
                   -translate-y-1/2
                   z-[60]
                   w-28"
        animate={{
          opacity:
            progress > 0.15 &&
            progress < 0.85
              ? 1
              : 0,
          scale:
            progress > 0.15 &&
            progress < 0.85
              ? 1
              : 0.8
        }}
      />
    </>
  );
}
