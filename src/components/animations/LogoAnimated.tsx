import Lottie from "react-lottie";

import animationData from "@/animations/logo.json";

const LogoAnimated = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={"-ml-10"}>
      <Lottie height={84} options={defaultOptions} width={84} />
    </div>
  );
};

export default LogoAnimated;
