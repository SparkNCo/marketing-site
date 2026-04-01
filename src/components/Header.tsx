"use client";

import { useEffect, useState } from "react";
import { useApp } from "../lib/AppProvider";
import LoginPopover from "./headerComponents/LoginPopover";

export default function Header({
  headerMode,
}: {
  headerMode?: "index" | "form";
}) {
  const { user, logout } = useApp();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (headerMode === "form") {
      setMode("dark");
      setHidden(false);
      // Keep header fixed and visible on proposal flows — avoids transform
      // conflicts with centered layout and overlap with page content.
      return;
    }

    // normal behavior (index mode)
    const handleScroll = () => {
      setMode(window.scrollY > 128 ? "dark" : "light");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerMode]);

  return (
    <header
      className={`
        fixed top-6 left-1/2 z-50 w-full max-w-4xl px-4
        -translate-x-1/2 transition-all duration-300
        ${hidden ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
      `}
    >
      <div
        className={`relative  rounded px-6 py-2
        flex items-center justify-between
        shadow-lg backdrop-blur-md transition-colors duration-300
        ${
          mode === "dark"
            ? "bg-card text-foreground"
            : "bg-background text-card"
        }`}
      >
        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center z-10">
          <img
            src={mode === "dark" ? "/icon2.svg" : "/icon.svg"}
            alt="spark/co"
            className="w-full h-full object-contain cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
        </div>

        {/* Title */}
        <h1
          className={`text-xl sm:text-2xl font-title font-bold z-10 tracking-tight ${
            mode === "dark" ? "text-background" : "text-card"
          }`}
        >
          spark/co
        </h1>

        {/* Auth */}
        {!user ? (
          <LoginPopover mode={mode} />
        ) : (
          <div className="flex items-center gap-3 z-10 ">
            <div className="h-9 w-9 rounded-full bg-background text-foreground  hidden  md:flex items-center justify-center font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={logout}
              className="text-sm hover:opacity-70 transition bg-background px-6 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useApp } from "../lib/AppProvider";
// import LoginPopover from "./headerComponents/LoginPopover";

// export default function Header({
//   headerMode,
// }: {
//   headerMode?: "index" | "form";
// }) {
//   const { user, logout } = useApp();
//   const [mode, setMode] = useState<"light" | "dark">("light");

//   useEffect(() => {
//     if (headerMode === "form") {
//       setMode("dark");
//       return;
//     }

//     const handleScroll = () => {
//       setMode(window.scrollY > 128 ? "dark" : "light");
//     };

//     handleScroll();
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [headerMode]);

//   return (
//     <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 ">
//       <div
//         className={`relative overflow-visible rounded px-6 py-2
//         flex items-center justify-between
//         shadow-lg backdrop-blur-md transition-colors duration-300
//         ${
//           mode === "dark"
//             ? "bg-card text-foreground"
//             : "bg-background text-card"
//         }`}
//       >
//         {/* Logo */}
//         <div className="w-12 h-12 flex items-center justify-center z-10">
//           <img
//             src={mode === "dark" ? "/icon.svg" : "/icon.svg"}
//             alt="spark/co"
//             className="w-full h-full object-contain cursor-pointer"
//             onClick={() => (window.location.href = "/")}
//           />
//         </div>

//         {/* Title */}
//         <h1
//           className={`text-3xl font-bold z-10 ${
//             mode === "dark" ? "text-background" : "text-card"
//           }`}
//         >
//           spark/co
//         </h1>

//         {/* Auth */}
//         {!user ? (
//           <LoginPopover mode={mode} />
//         ) : (
//           <div className="flex items-center gap-3 z-10 ">
//             <div className="h-9 w-9 rounded-full bg-background text-foreground flex items-center justify-center font-bold">
//               {user.email?.charAt(0).toUpperCase()}
//             </div>

//             <button
//               onClick={logout}
//               className="text-sm hover:opacity-70 transition bg-background px-6 py-2 rounded-full"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
