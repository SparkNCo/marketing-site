import React from "react";
import {
  AcceptanceOfTerms,
  AvailabilityDisclaimer,
  ChangesToTermsSection,
  CookieTrackingNotice,
  DisclaimersSection,
  EntireAgreementClause,
  GoverningLawSection,
  IndemnificationSection,
  IntellectualProperty,
  LimitationOfLiability,
  NoRelianceDisclaimer,
  ServicesOffered,
  TerminationClause,
  TermsContactInformationSection,
  TermsIntroduction,
  TermsPrivacyReference,
  ThirdPartyDisclaimer,
  UserObligations,
  UserSubmissionsLicense,
} from "../../components/terms-and-policy/TerminsAndConditions";

const TermsIsland = () => {
  return (
    <div className="bg-foreground w-3/5  mx-auto my-40">
      <TermsIntroduction />
      <AcceptanceOfTerms />
      <ServicesOffered />
      <UserObligations />
      <IntellectualProperty />
      <UserSubmissionsLicense />
      <TermsPrivacyReference />
      <NoRelianceDisclaimer />
      <ThirdPartyDisclaimer />
      <CookieTrackingNotice />
      <TerminationClause />
      <EntireAgreementClause />
      <AvailabilityDisclaimer />
      <DisclaimersSection />
      <LimitationOfLiability />
      <IndemnificationSection />
      <GoverningLawSection />
      <ChangesToTermsSection />
      <TermsContactInformationSection />
    </div>
  );
};

export default TermsIsland;
