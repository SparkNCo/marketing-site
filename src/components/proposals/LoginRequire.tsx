import { Lock } from "lucide-react";
import LoginPopover from "../headerComponents/LoginPopover";
import LoginRequiredModal from "../headerComponents/LoginRequireModal";

export const LoginRequire = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-xl bg-foreground text-center space-y-8 py-8 px-10 max-w-lg w-full shadow-2xl">
        {/* Icon */}
        <div className="mx-auto w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-16 h-16 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-title">Login required</h2>

          <p className="text-2xl text-secondary">
            Sign in or create an account to view and edit this proposal.
          </p>
        </div>

        {/* AUTH POPOVER */}
        <div className="flex justify-center">
          <LoginRequiredModal mode="dark" />
        </div>
      </div>
    </div>
  );
};
