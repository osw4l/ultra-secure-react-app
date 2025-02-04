import Lottie from "react-lottie";

import successData from "@/animations/success.json";

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie height={150} options={defaultOptions} width={150} />;
};

export default SuccessAnimation;
