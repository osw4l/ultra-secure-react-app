import Lottie from "react-lottie";

import animationData from "@/animations/query.json";

const QueryLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie height={200} options={defaultOptions} width={200} />;
};

export default QueryLoader;
