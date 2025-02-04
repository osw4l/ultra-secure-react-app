import Lottie from "react-lottie";

import iconData from "@/animations/user.json";

const UserAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: iconData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie height={34} options={defaultOptions} width={34} />;
};

export default UserAnimation;
