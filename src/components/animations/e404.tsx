import Lottie from "react-lottie";

import animationData from "@/animations/e404.json";

const E404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie width={300} options={defaultOptions} />;
};

export default E404;
