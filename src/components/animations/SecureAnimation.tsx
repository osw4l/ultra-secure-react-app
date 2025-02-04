import Lottie from "react-lottie";
import iconData from "@/animations/secure.json";

const SecureAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: iconData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      height={270}
      isClickToPauseDisabled={true}
      options={defaultOptions}
      speed={1.5}
      width={270}
    />
  );
};

export default SecureAnimation;