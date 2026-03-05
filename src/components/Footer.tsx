import clsx from "clsx";

export default function Footer({ mode }) {
  return (
    <footer
      className={clsx("w-full bg-foreground text-title font-semibold", {
        fixed: mode === "loading",
        relative: mode !== "loading",
      })}
    >
      <div className="max-w-[1530px] mx-auto px-6 py-6">
        <div
          className="
          grid grid-cols-2 gap-y-4 text-center
          md:flex md:flex-row md:justify-around md:text-left
        "
        >
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
        </div>

        {/* Bottom Text */}
        <div className="flex flex-col text-end mt-6">
          <p>2025 Spark & Co Technologies Inc.</p>
          <p>Registered in Canada. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
