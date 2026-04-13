import React from "react";

const ImpactBanner: React.FC = () => {
  const handleClick = () => {
    globalThis.location.href = "/impact";
  };

  return (
    <div className="my-[12rem] w-full px-6 lg:px-[4rem]">
      <button
        type="button"
        onClick={handleClick}
        className="mx-auto block w-fit max-w-full cursor-pointer border-none bg-secondary py-4 px-6 transition-opacity hover:opacity-90  "
      >
        <p className="text-center text-body font-semibold text-background lg:text-largeBody">
          We're accepting 2 more teams for our subsidized software development program, <span className="font-extrabold text-primary">Social Contracts.</span> Click here to see if you qualify.
        </p>
      </button>
    </div>
  );
};

export default ImpactBanner;
