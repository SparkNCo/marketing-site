import React from "react";

const ImpactBanner: React.FC = () => {
  const handleClick = () => {
    window.location.href = "/impact";
  };

  return (
    <div
      onClick={handleClick}
      className="w-full bg-primary py-6 px-6 lg:px-20 cursor-pointer hover:opacity-90 transition-opacity"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <p className="text-background text-body md:text-largeBody font-semibold text-center">
        Accepting 2 more teams for the Impact Program — See if you qualify
      </p>
    </div>
  );
};

export default ImpactBanner;
