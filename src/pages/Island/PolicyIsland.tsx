import {
  BreachNotification,
  ConsentExplanation,
  ContactAndPrivacyOfficer,
  DataRetention,
  InformationWeCollect,
  PrivacyPolicyIntro,
  ThirdPartyLinks,
  WithdrawalOfConsent,
  YourChoicesAndRights,
} from "../../components/terms-and-policy/PrivacyPolicy";

const PolicyIsland = () => {
  return (
    <div className="bg-foreground w-3/5 mx-auto my-40">
      <PrivacyPolicyIntro />
      <InformationWeCollect />
      <ConsentExplanation />
      <WithdrawalOfConsent />
      <BreachNotification />
      <DataRetention />
      <YourChoicesAndRights />
      <ThirdPartyLinks />
      <ContactAndPrivacyOfficer />
    </div>
  );
};

export default PolicyIsland;
