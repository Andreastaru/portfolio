import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { github, linkedin } from "../../utils/constants";
import { openInNewTab } from "../../utils/utils";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between w-full custom-padding-bottom ">
      <div className="flex space-x-4 mb-2 gap-2 custom-padding-bottom-xs">
        <IoLogoLinkedin
          size={36}
          onClick={() => openInNewTab(linkedin)}
          aria-label={`Open my linkedin`}
          className="hover:cursor-pointer text-white hover:text-gray-600 transition-colors"
        />
        <IoLogoGithub
          size={36}
          onClick={() => openInNewTab(github)}
          aria-label={`Open my github repository`}
          className="hover:cursor-pointer text-white hover:text-gray-600 transition-colors"
        />
      </div>
      <div className="text-center bg-opacity-20 text-white">
        Website Created By Andreas
      </div>
    </footer>
  );
};

export default Footer;
