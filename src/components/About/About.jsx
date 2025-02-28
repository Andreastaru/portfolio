import { AnimatedTestimonials } from "./AnimatedTestimonials";
import { useEffect, useState, useContext } from "react";
import { getCertifications, getPictures } from "../../services/contentful";
import { AboutCard } from "./AboutCard";
import DragCloseDrawer from "./DragCloseDrawer";

import { AppContext } from "../../context/AppProvider";
import { NavLink } from "react-router-dom";

function About() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDrawerOpen, setIsDrawerOpen } = useContext(AppContext);
  const [pictureOfAndreas, setPictureOfAndreas] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedPictures = await getPictures();
      const fetchedCertifications = await getCertifications();
      setCertifications(fetchedCertifications);

      const filteredDataForPicture = fetchedPictures.filter(
        (item) => item.title === "andreas"
      );

      if (filteredDataForPicture.length > 0) {
        setPictureOfAndreas(filteredDataForPicture[0].picture_url);
      } else {
        console.error("Couldn't find a picture with Title 'andreas'");
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-white text-center  text-2xl custom-padding-bottom">
        Let me share a little about myself
      </h1>
      <div className="justify-center flex custom-padding-bottom">
        <AboutCard picture={pictureOfAndreas} />
      </div>
      {isDrawerOpen && (
        <div className="grid h-screen place-content-center">
          <DragCloseDrawer
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
            picture={pictureOfAndreas}
          >
            <div className="mx-auto max-w-2xl space-y-4 text-white texl-left ">
              <p>
                Hey! I’m Andreas, a humble and disciplined individual with a
                passion for understanding the bigger picture. I believe in
                prioritizing long-term success over short-term gains, and I
                embrace a &quot;Get The Job Done&quot; attitude—where
                performance and results truly matter.
              </p>
              <br></br>
              <p>
                I take ownership of my failures and mistakes, viewing them as
                valuable opportunities for growth and learning. This mindset
                drives me to continuously improve and contribute meaningfully to
                my work.
              </p>
              <br></br>
              <p>
                I’m an outdoors enthusiast who loves to stay active through
                workouts and sports. Whether it’s hitting the gym or exploring
                nature, I believe that a balanced life fuels creativity and
                productivity. One of my favorite quotes by Jocko Willink
                resonates with me: “Relax. Look around. Make a call.” It reminds
                me to stay grounded and focused.
              </p>
              <br></br>

              <p>
                Professionally, I thrive on helping people and understanding
                their situations better. I’m a problem solver and a good
                listener, always eager to find solutions that benefit everyone
                involved.
              </p>
              <br></br>

              <p>
                <NavLink
                  to={"/contact"}
                  className="underline underline-offset-2 text-white hover:text-gray-300 transition-colors"
                >
                  Let’s connect!{" "}
                </NavLink>
                Don’t be a stranger—if you’re interested in collaborating or
                just want to chat, feel free to reach out!
              </p>
            </div>
          </DragCloseDrawer>
        </div>
      )}
      <h1 className="text-white text-center  text-2xl custom-padding-bottom">
        My Certifications
      </h1>
      <AnimatedTestimonials testimonials={certifications} />
    </div>
  );
}

export default About;
