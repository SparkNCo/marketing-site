import React from "react";
import {
  CookieChoicesSection,
  CookieDurationSection,
  CookiePolicyChangesSection,
  CookiePolicyContactSection,
  CookiePolicyIntroduction,
  HowWeUseCookiesSection,
  ThirdPartyCookiesSection,
  TypesOfCookiesSection,
  WhatAreCookiesSection,
} from "../../components/terms-and-policy/CookiePolicy";

const CookiePolicyIsland = () => {
  return (
    <div className="bg-foreground w-3/5 mx-auto my-40">
      <CookiePolicyIntroduction />
      <WhatAreCookiesSection />
      <HowWeUseCookiesSection />
      <TypesOfCookiesSection />
      <ThirdPartyCookiesSection />
      <CookieDurationSection />
      <CookieChoicesSection />
      <CookiePolicyChangesSection />
      <CookiePolicyContactSection />
    </div>
  );
};

export default CookiePolicyIsland;
