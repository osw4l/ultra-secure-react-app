import Lottie from "react-lottie";

import animationData from "@/animations/loader.json";

const Loader = ({ mt = -20 }: { mt?: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={`flex justify-center items-center h-screen w-screen`}
      style={{ marginTop: `${mt}px` }}
    >
      <Lottie height={200} options={defaultOptions} width={200} />
    </div>
  );
};

export default Loader;
