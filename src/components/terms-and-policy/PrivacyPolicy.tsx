// PrivacyTexts.tsx

export function PrivacyPolicyIntro() {
  return (
    <section className="bg-transparent text-background text-left space-y-4 px-10 py-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="text-sm opacity-80">Last Updated: 02/17/26</p>

      <p className="leading-relaxed">
        This Privacy Policy describes how Spark &amp; Co Technologies collects,
        uses, and discloses your personal information when you visit our website
        at{" "}
        <a
          href="https://buildwithspark.co"
          className="underline underline-offset-2 hover:opacity-80"
        >
          buildwithspark.co
        </a>{" "}
        and use our software development services. As a Canadian agency, we are
        committed to protecting your privacy and handling your personal
        information in compliance with the Personal Information Protection and
        Electronic Documents Act (PIPEDA) and other applicable provincial
        privacy legislation.
      </p>
    </section>
  );
}

export function InformationWeCollect() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">
        1. Information We Collect and Sources of Data
      </h2>

      <p className="leading-relaxed">
        We collect various types of information in connection with the services
        we provide, including:
      </p>

      {/* A */}
      <div className="space-y-4 ">
        <h3 className="text-xl font-semibold">
          A. Personal Information You Voluntarily Provide
        </h3>

        <p className="leading-relaxed">
          We collect personal information directly from you when you interact
          with our Site or services. This includes:
        </p>

        <ul className="space-y-2">
          <li>
            • <strong>Contact Information:</strong> Such as your name, email
            address, phone number, and mailing address when you fill out forms
            on our Site, subscribe to our newsletter, or contact us directly.
          </li>

          <li>
            • <strong>Account Information:</strong> If you create an account
            with us, we collect your username, password, and other registration
            details.
          </li>

          <li>
            • <strong>Communication Information:</strong> Records of your
            correspondence with us, including emails and chat messages.
          </li>

          <li>
            • <strong>Demographic Information:</strong> Such as your job title,
            company name, and industry.
          </li>
        </ul>
      </div>

      {/* B */}
      <div className="space-y-4 ">
        <h3 className="text-xl font-semibold">
          B. Information Collected Automatically
        </h3>

        <p className="leading-relaxed">
          When you visit our Site, we may automatically collect certain
          information about your device and browsing activity. This information
          is collected through automated means and includes:
        </p>

        <ul className="space-y-2">
          <li>
            • <strong>Log Data:</strong> Your IP address, browser type,
            operating system, referring URLs, pages viewed, and the dates/times
            of your visits.
          </li>

          <li>
            • <strong>Cookies and Tracking Technologies:</strong> We use
            cookies, web beacons, and similar technologies to track your
            activity on our Site and gather information about your preferences.
            This helps us improve your experience and our services. You can
            control cookie preferences through your browser settings.
          </li>
        </ul>

        {/* Cookie Details */}
        <div className="space-y-3">
          <p className="font-semibold">Cookie Details:</p>

          <p className="leading-relaxed">
            Our Site uses both session cookies (which are temporary and expire
            when you close your browser) and persistent cookies (which remain on
            your device until they expire or you delete them). These cookies
            help us remember your preferences, analyze site traffic, and deliver
            personalized content and advertisements. We also use third-party
            cookies from service providers for analytics and marketing purposes.
          </p>

          <p className="font-semibold">
            Our cookies fall into the following categories:
          </p>

          <ul className="space-y-2">
            <li>
              • <strong>Necessary Cookies:</strong> Essential for the website to
              function correctly, enabling basic features like page navigation
              and access to secure areas.
            </li>

            <li>
              • <strong>Analytics Cookies:</strong> Used to collect information
              about how visitors use our Site, such as which pages are visited
              most often, to help us improve our website's performance and user
              experience.
            </li>

            <li>
              • <strong>Marketing/Advertising Cookies:</strong> Used to track
              visitors across websites to display relevant advertisements and
              measure the effectiveness of advertising campaigns.
            </li>
          </ul>
        </div>

        <ul className="space-y-2">
          <li>
            • <strong>Device Information:</strong> Information about the device
            you use to access our Site, including hardware model, operating
            system, and unique device identifiers.
          </li>
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Consent Explanation                                                     */
/* -------------------------------------------------------------------------- */

export function ConsentExplanation() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">2. Consent Explanation</h2>

      <p className="leading-relaxed">
        We collect, use, and disclose your personal information with your
        knowledge and consent, except where otherwise permitted or required by
        law. Your consent may be express or implied, depending on the
        sensitivity of the information and the reasonable expectations of the
        individual.
      </p>

      <p className="leading-relaxed">
        When you provide us with personal information, you are consenting to our
        collection, use, and disclosure of that information as described in this
        Privacy Policy. For certain sensitive information or uses, we will
        obtain your explicit consent.
      </p>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/* 3. Withdrawal of Consent                                                   */
/* -------------------------------------------------------------------------- */

export function WithdrawalOfConsent() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">3. Withdrawal of Consent</h2>

      <p className="leading-relaxed">
        You have the right to withdraw your consent to the collection, use, or
        disclosure of your personal information at any time, subject to legal or
        contractual restrictions and reasonable notice.
      </p>

      <p className="leading-relaxed">
        Please note that withdrawing consent may limit our ability to provide
        you with certain services or features of our Site. To withdraw your
        consent, please contact our Privacy Officer using the details provided
        in the "Contact Us" section.
      </p>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/* 4. Breach Notification                                                     */
/* -------------------------------------------------------------------------- */

export function BreachNotification() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">4. Breach Notification</h2>

      <p className="leading-relaxed">
        In the event of a security breach involving personal information that
        poses a real risk of significant harm to individuals, we will notify
        affected individuals and the Office of the Privacy Commissioner of
        Canada (OPC) as required by PIPEDA.
      </p>

      <p className="leading-relaxed">
        We will take all necessary steps to contain the breach, mitigate its
        impact, and prevent future occurrences.
      </p>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/* 5. Retention                                                               */
/* -------------------------------------------------------------------------- */

export function DataRetention() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">5. Retention</h2>

      <p className="leading-relaxed">
        We retain your personal information only for as long as necessary to
        fulfill the purposes for which it was collected, or as required by law.
        For example, we generally retain personal information for a period of 7
        years to comply with tax and other legal obligations.
      </p>

      <p className="leading-relaxed">
        Once your personal information is no longer needed, we will securely
        dispose of it in a manner that prevents unauthorized access. Retention
        periods may vary depending on the type of information and the purpose of
        its collection.
      </p>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/* 6. Your Choices and Rights                                                 */
/* -------------------------------------------------------------------------- */

export function YourChoicesAndRights() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">6. Your Choices and Rights</h2>

      <p className="leading-relaxed">
        You have certain rights regarding your personal information, including:
      </p>

      <ul className="space-y-3 ">
        <li>
          • <strong>Access and Correction:</strong> You can request access to
          the personal information we hold about you and ask for corrections to
          be made.
        </li>

        <li>
          • <strong>Opt-Out of Marketing Communications:</strong> You can opt
          out of receiving marketing emails from us by following the unsubscribe
          instructions included in those emails.
        </li>

        <li>
          • <strong>Cookies:</strong> You can set your browser to refuse all or
          some browser cookies, or to alert you when websites set or access
          cookies. If you disable or refuse cookies, some parts of this Site may
          become inaccessible or not function properly.
        </li>

        <li>
          • <strong>Do Not Track:</strong> Our Site does not currently respond
          to "Do Not Track" signals.
        </li>

        <li>
          • <strong>Right to Complain:</strong> You have the right to contact
          the Office of the Privacy Commissioner of Canada (OPC) if you believe
          your privacy rights have been violated. You can find their contact
          information on the OPC website.
        </li>
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Third-Party Links                                                       */
/* -------------------------------------------------------------------------- */

export function ThirdPartyLinks() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>

      <p className="leading-relaxed">
        Our Site may contain links to third-party websites or services that are
        not operated by us. We are not responsible for the privacy practices of
        these third parties.
      </p>

      <p className="leading-relaxed">
        We encourage you to review the privacy policies of any third-party sites
        you visit.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Contact Us and Privacy Officer                                          */
/* -------------------------------------------------------------------------- */

export function ContactAndPrivacyOfficer() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">
        8. Contact Us and Privacy Officer
      </h2>

      <p className="leading-relaxed">
        If you have any questions about this Privacy Policy or our data
        practices, please contact us:
      </p>

      <ul className="space-y-2">
        <li>
          • <strong>Company:</strong> Spark &amp; Co Technologies
        </li>

        <li>
          • <strong>By Email:</strong>{" "}
          <a
            href="mailto:kabir@buildwithspark.co"
            className="underline underline-offset-2 hover:opacity-80"
          >
            kabir@buildwithspark.co
          </a>
        </li>

        <li>
          • <strong>By Phone:</strong> 647 929 7059
        </li>

        <li>
          • <strong>By Mail:</strong> 251 Jarvis St, Toronto, ON
        </li>
      </ul>

      <div className="space-y-3 pt-4">
        <p className="font-semibold">Privacy Officer</p>

        <p className="leading-relaxed">
          For questions about our privacy practices or to exercise your rights
          under PIPEDA, contact our Privacy Officer using the details above.
        </p>
      </div>
    </section>
  );
}
