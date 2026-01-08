import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface WelcomeProposalTemplateProps {
  name: string;
  leadId: string;
  schedulingUrl: string;
  proposalLink: string;
}

const WelcomeProposalTemplate = ({
  name,
  leadId,
  schedulingUrl,
  proposalLink,
}: WelcomeProposalTemplateProps) => {
  const previewText =
    "Your proposal is ready — confirm your meeting to continue.";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 mx-0">
              Welcome, {name} 👋
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Thanks for reaching out! We’ve received your submission and
              started preparing a proposal tailored to your project.
            </Text>

            {/* ---------- PROPOSAL ---------- */}
            <Text className="text-black text-[14px] leading-[24px]">
              You can access and complete your proposal using the link below:
            </Text>

            <Section className="text-center my-[24px]">
              <Link
                href={proposalLink}
                className="bg-black text-white px-4 py-2 rounded no-underline text-[14px]"
              >
                View your proposal
              </Link>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              Please add the required details about the features you’d like.
              Once completed, you’ll be able to review the finalized proposal at
              the same link.
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* ---------- SCHEDULING ---------- */}
            <Text className="text-black text-[14px] leading-[24px] font-medium">
              📅 Confirm your meeting
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              To move forward, please confirm your meeting by selecting your
              preferred time using the link below. This step is required to
              finalize your booking.
            </Text>

            <Section className="text-center my-[24px]">
              <Link
                href={schedulingUrl}
                className="bg-black text-white px-4 py-2 rounded no-underline text-[14px]"
              >
                Confirm meeting time
              </Link>
            </Section>

            <Text className="text-black text-[13px] leading-[22px] text-gray-600">
              Once the meeting is confirmed, you’ll receive a calendar invite
              with all the details.
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-black text-[14px] leading-[24px]">
              Have a great day,
              <br />
              <strong>The Team</strong>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeProposalTemplate;
