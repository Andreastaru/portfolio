import { useEffect, useState } from "react";
import { getParagraphByTitle } from "../../services/contentful";
import { GettingBetter } from "./Stories/GettingBetter";
import { GotTheJob } from "./Stories/GotTheJob";
import { HowItStarted } from "./Stories/HowItStarted";
import { SmallVictories } from "./Stories/SmallVictories";
import { WhatsNext } from "./Stories/WhatsNext";
import { Tabs } from "./tabs";

function Experience() {
  const [experienceGettingBetter, setExperienceGettingBetter] = useState(null);
  const [experienceGotTheJob, setExperienceGotTheJob] = useState(null);
  const [experienceHowItStarted, setExperienceHowItStarted] = useState(null);
  const [experienceSmallVictories, setExperienceSmallVictories] =
    useState(null);
  const [experienceWhatsNext, setExperienceWhatsNext] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedParagraphGettingBetter = await getParagraphByTitle(
        "getting_better"
      );
      const fetchedParagraphWhatsNext = await getParagraphByTitle("whats_next");

      const fetchedParagraphSmallVictories = await getParagraphByTitle(
        "small_victories"
      );
      const fetchedParagraphHowItStarted = await getParagraphByTitle(
        "how_it_started"
      );
      const fetchedParagraphGotTheJob = await getParagraphByTitle(
        "got_the_job"
      );
      setExperienceGettingBetter(fetchedParagraphGettingBetter);
      setExperienceWhatsNext(fetchedParagraphWhatsNext);
      setExperienceSmallVictories(fetchedParagraphSmallVictories);
      setExperienceHowItStarted(fetchedParagraphHowItStarted);
      setExperienceGotTheJob(fetchedParagraphGotTheJob);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const tabs = [
    {
      title: "How It Started",
      value: "how_it_started",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border  border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl  top-0  z-10 font-semibold pt-14 mb-4 custom-padding-top paragraph-mobile-padding-side paragraph-mobile-padding-bottom">
            It all started with a simple idea
          </p>
          <div className="flex-grow flex items-center justify-center pb-4 paragraph-mobile-padding-bottom">
            <HowItStarted paragraph={experienceHowItStarted?.paragraph} />
          </div>
        </div>
      ),
    },
    {
      title: "Got the Job",
      value: "got_the_job",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl  top-0  z-10 font-semibold pt-14 mb-4 custom-padding-top paragraph-mobile-padding-side paragraph-mobile-padding-bottom">
            I got the job in one of the biggest financial company
          </p>
          <div className="flex-grow flex items-center justify-center pb-4 paragraph-mobile-padding-bottom">
            <GotTheJob paragraph={experienceGotTheJob?.paragraph} />
          </div>
        </div>
      ),
    },
    {
      title: "Small Victories",
      value: "small_victories",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p
            className=" underline underline-offset-8 text-center text-xl  top-0  z-10 font-semibold pt-14 mb-4 custom-padding-top 
          paragraph-mobile-padding-side paragraph-mobile-padding-bottom"
          >
            Living in the moment and enjoying the ride
          </p>
          <div className="flex-grow flex items-center justify-center pb-4 paragraph-mobile-padding-bottom">
            <SmallVictories paragraph={experienceSmallVictories?.paragraph} />
          </div>
        </div>
      ),
    },
    {
      title: "Getting Better",
      value: "getting_better",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl  top-0  z-10 font-semibold pt-14 mb-4 custom-padding-top paragraph-mobile-padding-side paragraph-mobile-padding-bottom">
            Stay hungry, stay curious. Keep learning
          </p>
          <div className="flex-grow flex items-center justify-center pb-4 paragraph-mobile-padding-bottom">
            <GettingBetter paragraph={experienceGettingBetter?.paragraph} />
          </div>
        </div>
      ),
    },
    {
      title: "What's Next",
      value: "whats_next",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl  top-0  z-10 font-semibold pt-14 mb-4 custom-padding-top paragraph-mobile-padding-bottom paragraph-mobile-padding-side">
            It&apos;s time to go further
          </p>
          <div className="flex-grow flex items-center justify-center pb-4 paragraph-mobile-padding-bottom">
            <WhatsNext paragraph={experienceWhatsNext?.paragraph} />
          </div>
        </div>
      ),
    },
  ];
  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div className="h-[20rem]  [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40 container-without-margin-top ">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Experience;
