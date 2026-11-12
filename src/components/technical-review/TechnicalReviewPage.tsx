import Header from "../Header";
import Footer from "../Footer";
import { AppProvider } from "../../lib/AppProvider";
import { TechnicalReviewFlow } from "./TechnicalReviewFlow";

// Public /technical-review page (SPA-586): a free self-serve questionnaire
// that finds the gaps in a product and invites people who need help to a
// free consult or code review.
export default function TechnicalReviewPage() {
  return (
    <AppProvider>
      {/* Column at least one screen tall, so the footer stays at the bottom
          while the questionnaire loads or a page is short. */}
      <div className="flex min-h-screen flex-col bg-background text-foreground font-body">
        {/* "form" = light theme, always visible. */}
        <Header headerMode="form" />
        <main className="mt-10 flex-1 pb-24 pt-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-0">
            <TechnicalReviewFlow />
          </div>
        </main>
        <Footer mode="index" />
      </div>
    </AppProvider>
  );
}
