/* -------------------------------------------------------------------------- */
/* 1. Introduction                                                            */
/* -------------------------------------------------------------------------- */

export function CookiePolicyIntroduction() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>

      <p className="text-sm opacity-80">Last Updated: 04/18/26</p>

      <h2 className="text-2xl font-semibold">1. Introduction</h2>

      <p className="leading-relaxed">
        This Cookie Policy explains how Spark &amp; Co Technologies
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and
        similar technologies when you visit our website (the &quot;Website&quot;).
        It describes what these technologies are, why we use them, and your
        choices regarding their use.
      </p>

      <p className="leading-relaxed">
        This policy should be read together with our{" "}
        <a
          href="/privacy-policy"
          className="underline underline-offset-2 hover:opacity-80"
        >
          Privacy Policy
        </a>
        , which provides additional detail about how we handle personal
        information.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. What Are Cookies */
/* -------------------------------------------------------------------------- */

export function WhatAreCookiesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">2. What Are Cookies?</h2>

      <p className="leading-relaxed">
        Cookies are small text files that are placed on your device (computer,
        tablet, or mobile) when you visit a website. They are widely used to
        make websites work more efficiently, improve user experience, and
        provide information to site owners.
      </p>

      <p className="leading-relaxed">
        Similar technologies include local storage, session storage, pixels, and
        other identifiers that store or access information on your device. In
        this policy, we refer to all of these as &quot;cookies&quot; unless we
        specify otherwise.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. How We Use Cookies                                                      */
/* -------------------------------------------------------------------------- */

export function HowWeUseCookiesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">3. How We Use Cookies</h2>

      <p className="leading-relaxed">
        We use cookies and similar technologies for purposes such as:
      </p>

      <ul className="space-y-3 text-left">
        <li>
          • <strong>Operating the Website:</strong> Enabling core functionality,
          load balancing, security, and fraud prevention.
        </li>
        <li>
          • <strong>Preferences:</strong> Remembering settings or choices you make
          during your visit.
        </li>
        <li>
          • <strong>Analytics:</strong> Understanding how visitors use the
          Website so we can improve content and performance.
        </li>
        <li>
          • <strong>Marketing (where applicable):</strong> Measuring the
          effectiveness of campaigns and, where allowed, delivering more relevant
          experiences.
        </li>
      </ul>

      <p className="leading-relaxed">
        <strong>When you accept cookies</strong> (for example, through our cookie
        banner), we load{" "}
        <strong>PostHog</strong> for product and usage analytics and the{" "}
        <strong>Meta (Facebook) Pixel</strong> for advertising measurement,
        optimization, and related marketing purposes. These tools may set or read
        cookies or similar storage on your device and send information to PostHog
        and Meta Platforms, Inc. in accordance with their respective policies.
      </p>

      <p className="leading-relaxed">
        <strong>If you do not accept cookies</strong> (or you reject
        non-essential cookies), we do not load the Meta Pixel or PostHog on your
        visit in connection with that choice, except as needed for strictly
        necessary operation of the Website.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Types of Cookies                                                        */
/* -------------------------------------------------------------------------- */

export function TypesOfCookiesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">4. Types of Cookies We May Use</h2>

      <div className="space-y-4">
        <p className="font-semibold">A. Strictly Necessary Cookies</p>
        <p className="leading-relaxed">
          These cookies are required for the Website to function and cannot be
          switched off in our systems. They are usually set only in response to
          actions you take, such as setting privacy preferences, logging in, or
          filling in forms.
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">B. Functional Cookies</p>
        <p className="leading-relaxed">
          These cookies enable enhanced functionality and personalization, such
          as remembering your region or language. If you do not allow these
          cookies, some or all of these services may not work properly.
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">C. Analytics / Performance Cookies</p>
        <p className="leading-relaxed">
          When you accept cookies, we use <strong>PostHog</strong> to collect
          usage and performance information about the Website (such as pages
          viewed and interactions). PostHog may use cookies, local storage, or
          similar technologies to recognize your browser or device and to
          associate events with a session or distinct ID.
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">D. Marketing / Advertising Cookies</p>
        <p className="leading-relaxed">
          When you accept cookies, we use the <strong>Meta Pixel</strong> (Meta
          Pixel / Facebook Pixel) to measure conversions from our ads, build
          audiences for advertising, and deliver and optimize ads across Meta
          products and partner sites. Meta may use cookies and similar
          technologies for these purposes. Meta&apos;s use of data is described
          in Meta&apos;s privacy and cookie materials.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Third-Party Cookies                                                   */
/* -------------------------------------------------------------------------- */

export function ThirdPartyCookiesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">5. Third-Party Cookies</h2>

      <p className="leading-relaxed">
        When you accept cookies, third-party technologies we use include:
      </p>

      <ul className="space-y-3 text-left">
        <li>
          • <strong>PostHog</strong> (PostHog, Inc.) for product analytics. See{" "}
          <a
            href="https://posthog.com/privacy"
            className="underline underline-offset-2 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            PostHog&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          • <strong>Meta Pixel</strong> (Meta Platforms, Inc.) for advertising and
          measurement. See{" "}
          <a
            href="https://www.facebook.com/privacy/policy"
            className="underline underline-offset-2 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta&apos;s Privacy Policy
          </a>{" "}
          and Meta&apos;s cookie and advertising controls as described there.
        </li>
      </ul>

      <p className="leading-relaxed">
        We may also allow other service providers (for example, chat or hosting
        partners) to set cookies when you use the Website. We do not control
        third-party cookies; please review the relevant provider&apos;s privacy
        or cookie notice.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Duration                                                                */
/* -------------------------------------------------------------------------- */

export function CookieDurationSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">6. Session and Persistent Cookies</h2>

      <p className="leading-relaxed">
        Some cookies are &quot;session&quot; cookies, which expire when you close
        your browser. Others are &quot;persistent&quot; cookies, which remain on
        your device for a set period or until you delete them. The retention
        period depends on the purpose of the cookie and the provider.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Your Choices                                                            */
/* -------------------------------------------------------------------------- */

export function CookieChoicesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">7. Your Choices</h2>

      <p className="leading-relaxed">
        When you first visit our Website, you may see a cookie banner or similar
        notice that allows you to accept or reject non-essential cookies, where
        required by applicable law. Accepting loads PostHog and the Meta Pixel
        as described above; rejecting (or not accepting) means those tools are
        not used for your visit in line with that choice. You can change your
        mind at any time by clearing cookies or site data in your browser,
        clearing stored consent where applicable, or adjusting your browser
        settings.
      </p>

      <p className="leading-relaxed">
        Most web browsers allow you to control cookies through their settings.
        Blocking or deleting cookies may impact your ability to use certain
        features of the Website.
      </p>

      <p className="leading-relaxed">
        For more information about how we process personal data in connection
        with cookies, see our{" "}
        <a
          href="/privacy-policy"
          className="underline underline-offset-2 hover:opacity-80"
        >
          Privacy Policy
        </a>
        .
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Changes */
/* -------------------------------------------------------------------------- */

export function CookiePolicyChangesSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">8. Changes to This Cookie Policy</h2>

      <p className="leading-relaxed">
        We may update this Cookie Policy from time to time to reflect changes in
        technology, law, or our practices. We will post the updated policy on
        this page and revise the &quot;Last Updated&quot; date above. We encourage
        you to review this policy periodically.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Contact                                                                 */
/* -------------------------------------------------------------------------- */

export function CookiePolicyContactSection() {
  return (
    <section className="bg-transparent text-background text-left space-y-6 px-10 py-10">
      <h2 className="text-2xl font-semibold">9. Contact Information</h2>

      <p className="leading-relaxed">
        If you have any questions about our use of cookies, please contact us:
      </p>

      <ul className="space-y-2">
        <li>
          • <strong>Company:</strong> Spark &amp; Co Technologies
        </li>

        <li>
          • <strong>Address:</strong> 251 Jarvis St, Toronto, ON
        </li>

        <li>
          • <strong>Phone:</strong> 647 929 7059
        </li>

        <li>
          • <strong>Other inquiries:</strong>{" "}
          <a
            href="mailto:kabir@buildwithspark.co"
            className="underline underline-offset-2 hover:opacity-80"
          >
            Contact us
          </a>
        </li>
      </ul>
    </section>
  );
}
