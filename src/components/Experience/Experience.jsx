import { GettingBetter } from "./Stories/GettingBetter";
import { GotTheJob } from "./Stories/GotTheJob";
import { HowItStarted } from "./Stories/HowItStarted";
import { SmallVictories } from "./Stories/SmallVictories";
import { WhatsNext } from "./Stories/WhatsNext";
import { Tabs } from "./tabs";

function Experience() {
  const tabs = [
    {
      title: "How It Started",
      value: "how_it_started",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl sticky top-0 backdrop-blur-custom z-10 font-semibold pt-14 mb-4 custom-padding-top">
            It all started with a simple idea
          </p>
          <div className="flex-grow flex items-center justify-center pb-4">
            <HowItStarted />
          </div>
        </div>
      ),
    },
    {
      title: "Got the Job",
      value: "got_the_job",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl sticky top-0 backdrop-blur-custom z-10 font-semibold pt-14 mb-4 custom-padding-top">
            I got the job in one of the biggest financial company
          </p>
          <div className="flex-grow flex items-center justify-center pb-4">
            <GotTheJob />
          </div>
        </div>
      ),
    },
    {
      title: "Small Victories",
      value: "small_victories",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl sticky top-0 backdrop-blur-custom z-10 font-semibold pt-14 mb-4 custom-padding-top">
            Living in the moment and enjoying the ride
          </p>
          <div className="flex-grow flex items-center justify-center pb-4">
            <SmallVictories />
          </div>
        </div>
      ),
    },
    {
      title: "Getting Better",
      value: "getting_better",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl sticky top-0 backdrop-blur-custom z-10 font-semibold pt-14 mb-4 custom-padding-top">
            Stay hungry, stay curious. Keep learning
          </p>
          <div className="flex-grow flex items-center justify-center pb-4">
            <GettingBetter />
          </div>
        </div>
      ),
    },
    {
      title: "What's Next",
      value: "whats_next",
      content: (
        <div className="w-full h-[60vh] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] overflow-y-auto rounded-2xl p-10 text-white backdrop-blur-custom border border-white custom-scrollbar flex flex-col">
          <p className=" underline underline-offset-8 text-center text-xl sticky top-0 backdrop-blur-custom z-10 font-semibold pt-14 mb-4 custom-padding-top">
            It&apos;s time to go further
          </p>
          <div className="flex-grow flex items-center justify-center pb-4">
            <WhatsNext />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem]  [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40 container-without-margin-top ">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Experience;
