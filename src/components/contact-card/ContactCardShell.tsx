"use client";

import React from "react";
import SquaresGridLayout from "../layouts/GridLayout";
import { ContactCardMotifSquaresConfig } from "./ContactCardSquaresConfig.ts";

const profileImage =
  "https://www.figma.com/api/mcp/asset/3a2e3406-2f3c-4341-97e6-367260c04b7c";
const qrImage =
  "https://www.figma.com/api/mcp/asset/ec14feef-5729-4e55-8d2b-8122d5d1897d";
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
};

function ActionRow({ iconSrc, text }: Readonly<ActionRowProps>) {
  return (
    <div
      className="bg-[#111111] h-9 w-fit flex items-center gap-3 px-3 text-[#F7F4F0] text-[18px] leading-none"
    >
      <img alt="" src={iconSrc} className="w-6 h-6 shrink-0" />
      <span className="font-body font-light">{text}</span>
    </div>
  );
}

export default function ContactCardShell() {
  const [hideMotifSquares, setHideMotifSquares] = React.useState(false);
  const [showQrCode, setShowQrCode] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      setHideMotifSquares(window.innerWidth < 380);
      setShowQrCode(window.innerHeight >= 873);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
            />
            <ActionRow
              iconSrc={iconEmail}
              text="kabir@buildwithspark.co"
            />
            <ActionRow
              iconSrc={iconCalendar}
              text="Calendar Booking"
            />
            <ActionRow iconSrc={iconDownload} text="Download" />
            <ActionRow iconSrc={iconShare} text="Share" />
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
