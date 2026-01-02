import { resend } from "./resend";
import { render } from "@react-email/render";
import WelcomeProposalTemplate from "../../../components/ui/EmailTemplate/WelcomeProposalTemplate";

type SendWelcomeMailParams = {
  email: string;
  name: string;
  leadId: string;
};

export async function sendWelcomeMail({
  email,
  name,
  leadId,
}: SendWelcomeMailParams) {
  console.log("Sending welcome email to:", email, leadId, name);

  const html = await render(
    <WelcomeProposalTemplate name={name} leadId={leadId} />
  );

  const response = await resend.emails.send({
    from: "support@rentscape.co",
    to: email,
    subject: "Your project proposal is ready 🚀",
    html,
  });

  console.log("Welcome email sent response:", response);

  return response;
}

// You can only send testing emails to your own email address (nicolaus@rentscape.co). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.
