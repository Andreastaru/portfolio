import { roles } from "../../utils/constants";
import EncryptButton from "./EncryptButton";
import { FlipWords } from "./FlipWords";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 pb-20 container gap-10">
      <div className="text-4xl mx-auto  text-neutral-600 dark:text-neutral-400 mb-10 mt-20 custom-padding-bottom2x text-center xl:text-left lg:text-left md:text-left sm:text-left">
        Hi, I’m Andreas!
        <br /> I’m a
        <FlipWords words={roles} className={"text-center"} />
        <br />
        Let’s build something amazing together!
      </div>
      <div className="mt-10">
        <EncryptButton />
      </div>
    </div>
  );
};

export default LandingPage;
