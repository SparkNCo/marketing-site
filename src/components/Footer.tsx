import clsx from "clsx";

export default function Footer({ mode }) {
  return (
    <footer
      className={clsx(
        "w-full px-10 py-4 flex justify-around items-center text-md text-title bg-foreground font-semibold gap-6 flex-wrap ",
        {
          fixed: mode === "loading",
          relative: mode !== "loading",
        },
      )}
    >
      <div>
        <img
          src={"/nbarIcon2.png"}
          alt="spark/co"
          className="w-full h-full object-contain"
        />
      </div>

      <a href="/privacy-policy" className="hover:underline">
        Privacy Policy
      </a>

      <a href="/terms-and-conditions" className="hover:underline">
        Terms and Conditions
      </a>

      <a href="/cookie-policy" className="hover:underline">
        Cookie Policy
      </a>

      <a href="/contact" className="hover:underline">
        Contact
      </a>

      <div className="flex flex-col text-end">
        <p>2025 Spark & Co Technologies Inc.</p>
        <p>Registered in Canada. All rights reserved</p>
      </div>
    </footer>
  );
}
