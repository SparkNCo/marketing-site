import React from "react";

const ImpactBanner: React.FC = () => {
  const handleClick = () => {
    globalThis.location.href = "/impact";
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full bg-primary py-4
       px-6 lg:px-20 cursor-pointer hover:opacity-90 transition-opacity border-none"
    >
      <p className="text-background text-body md:text-largeBody font-semibold text-center">
        Accepting 2 more teams for the Impact Program — See if you qualify
      </p>
    </button>
  );
};

export default ImpactBanner;
