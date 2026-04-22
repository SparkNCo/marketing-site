"use client";

import React from "react";
import SquaresGridLayout from "../layouts/GridLayout";
import { ContactCardMotifSquaresConfig } from "./ContactCardSquaresConfig.ts";

const profileImage =
  "https://www.figma.com/api/mcp/asset/3a2e3406-2f3c-4341-97e6-367260c04b7c";
const qrImage =
  "https://api.qrserver.com/v1/create-qr-code/?size=129x129&data=https%3A%2F%2Fbuildwithspark.co%2Fcontact-card";
const iconPhone =
  "https://www.figma.com/api/mcp/asset/dd2a4e84-c59b-4f00-b492-ca6d8af30faa";
const iconEmail =
  "https://www.figma.com/api/mcp/asset/c96466db-96d8-4d38-82d4-f848a298bec0";
const iconWeb =
  "https://www.figma.com/api/mcp/asset/1153fbd3-2569-472b-a014-f86328b20409";
const iconDownload =
  "https://www.figma.com/api/mcp/asset/cf2ffc44-f7d5-474f-8db4-c6119e976bfa";
const iconCalendar =
  "https://www.figma.com/api/mcp/asset/0d227248-237d-48d8-905c-ac2c3e58fc0f";
const iconShare =
  "https://www.figma.com/api/mcp/asset/e22096cd-90cc-40b0-8fbb-ad93f849b982";

type ActionRowProps = {
  iconSrc: string;
  text: string;
  href?: string;
  onClick?: () => void;
};

function ActionRow({ iconSrc, text, href, onClick }: Readonly<ActionRowProps>) {
  const baseClassName =
    "bg-[#111111] h-9 w-fit flex items-center gap-3 px-3 text-[#F7F4F0] text-[18px] leading-none cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F78035]";

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        <img alt="" src={iconSrc} className="w-6 h-6 shrink-0" />
        <span className="font-body font-light">{text}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClassName}>
      <img alt="" src={iconSrc} className="w-6 h-6 shrink-0" />
      <span className="font-body font-light">{text}</span>
    </button>
  );
}

export default function ContactCardShell() {
  const [hideMotifSquares, setHideMotifSquares] = React.useState(false);
  const [showQrCode, setShowQrCode] = React.useState(true);
  const [shareLabel, setShareLabel] = React.useState("Share");

  const phoneHref = "tel:+16479297059";
  const emailAddress = "kabir@buildwithspark.co";
  const emailHref = `mailto:${emailAddress}`;
  const calendarHref =
    "https://cal.com/kabir-malkani-glnivq/15min";

  React.useEffect(() => {
    const handleResize = () => {
      setHideMotifSquares(window.innerWidth < 380);
      setShowQrCode(window.innerHeight >= 873);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadContact = React.useCallback(() => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Kabir Malkani",
      "N:Malkani;Kabir;;;",
      "ORG:Spark/co",
      "TITLE:Founder",
      "TEL;TYPE=WORK,VOICE:+16479297059",
      `EMAIL;TYPE=WORK:${emailAddress}`,
      "URL:https://buildwithspark.co",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kabir-malkani.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleShare = React.useCallback(async () => {
    const shareData = {
      title: "Kabir Malkani - Spark/co",
      text: "Get in touch with Kabir Malkani.",
      url: "https://buildwithspark.co/contact-card",
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(
      `${shareData.text} ${phoneHref.replace("tel:", "Phone: ")} ${emailAddress} ${shareData.url}`,
    );
    setShareLabel("Copied");
    window.setTimeout(() => setShareLabel("Share"), 1500);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#111111] flex items-center justify-center">
      <main className="w-full min-w-[320px] max-w-[430px] h-[100dvh] max-h-[932px] bg-[#F7F4F0] relative pb-6">
        <section className="bg-[#111111] text-[#F7F4F0] pt-10 pb-8 px-6">
          <img
            alt="Spark logo"
            src="/icon.svg"
            className="w-[107px] h-[87px] mx-auto"
          />
          <h1 className="text-center text-heading1 font-semibold leading-none mt-3">
            spark/co
          </h1>
          <div className="mt-6 mx-auto max-w-[200px] h-9 bg-[#F7F4F0] text-[#111111] flex items-center gap-3 px-3">
            <img alt="" src={iconWeb} className="w-6 h-6 shrink-0" />
            <span className="font-body text-[18px]">buildwithspark.co</span>
          </div>
        </section>

        <SquaresGridLayout
          squares={hideMotifSquares ? [] : ContactCardMotifSquaresConfig}
          cellSize={16}
          width="100%"
          background="#F7F4F0"
          indexLayout={0}
          indexComponent={1}
          className="h-[240px]"
        >
          <div className="h-full relative px-8">
            <div className="absolute top-8 right-8 w-[128px] h-[128px]">
              <img
                alt="Kabir Malkani portrait"
                src={profileImage}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="absolute bottom-6 right-8 text-right text-heading1 font-bold leading-none text-[#111111]">
              Kabir Malkani
            </h2>
            <p className="absolute bottom-0 right-8 text-right text-body leading-none text-[#111111]">
              Founder
            </p>
          </div>
        </SquaresGridLayout>

        <section className="px-8 mt-8 bg-[#F7F4F0] pb-8">
          <div className="space-y-[14px]">
            <ActionRow
              iconSrc={iconPhone}
              text="+1 (647) 929-7059"
              href={phoneHref}
            />
            <ActionRow
              iconSrc={iconEmail}
              text="kabir@buildwithspark.co"
              href={emailHref}
            />
            <ActionRow
              iconSrc={iconCalendar}
              text="Calendar Booking"
              href={calendarHref}
            />
            <ActionRow
              iconSrc={iconDownload}
              text="Download"
              onClick={handleDownloadContact}
            />
            <ActionRow iconSrc={iconShare} text={shareLabel} onClick={handleShare} />
          </div>
        </section>

        {showQrCode ? (
          <section className="absolute right-8 bottom-4">
            <img
              alt="Contact QR code"
              src={qrImage}
              className="w-[129px] h-[129px]"
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}
