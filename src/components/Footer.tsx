import clsx from "clsx";

export default function Footer({ mode }) {
  return (
    <footer
      className={clsx(
        "bottom-0 w-full px-10 py-4 flex justify-around items-center text-md text-title bg-secondary font-semibold gap-6 flex-wrap",
        {
          fixed: mode === "loading",
          relative: mode !== "loading",
        }
      )}
    >
      <div>
        <img
          src={"/nbarIcon2.png"}
          alt="spark/co"
          className="w-full h-full object-contain"
        />
      </div>
      <p>Privacy Policy</p>
      <p>Terms and Conditions</p>
      <p>Cookie Policy</p>
      <p>Contact</p>
      <div className="flex flex-col text-end">
        <p>2025 Spark & Co Technologies Inc.</p>
        <p>Registered in Canada. All rights reserved</p>
      </div>
    </footer>
  );
}
