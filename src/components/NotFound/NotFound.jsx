import { getImageUrl } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import SimpleButton from "../Utils/SimpleButton";

const NotFound = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 h-100 ">
      <h1 className="text-white mb-4 text-2xl xs:text-xl">
        Couldn’t find page ’{pathname}’
      </h1>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="bug"
        className="z-10 animate-floating max-w-[30%] h-auto mb-4 hero-img"
      />
      <div className="padding-2x">
        <SimpleButton text="Go Back Home" route="/" />
      </div>
    </div>
  );
};

export default NotFound;
