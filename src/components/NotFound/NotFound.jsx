import { useLocation } from "react-router-dom";
import SimpleButton from "../Utils/SimpleButton";
import { useState, useEffect } from "react";
import { getPictures } from "../../services/contentful";

const NotFound = () => {
  const [pictureOfBug, setPictureOfBug] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const fetchedPictures = await getPictures();

      const filteredDataForPicture = fetchedPictures.filter(
        (item) => item.title === "bug"
      );

      if (filteredDataForPicture.length > 0) {
        setPictureOfBug(filteredDataForPicture[0].picture_url);
      } else {
        console.error("Couldn't find a picture with Title 'bug'");
      }
    }

    fetchData();
  }, []);

  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 h-100 ">
      <h1 className="text-white mb-4 text-2xl xs:text-xl">
        Couldn’t find page ’{pathname}’
      </h1>
      <img
        src={pictureOfBug}
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
