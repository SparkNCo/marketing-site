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
}

const WelcomeProposalTemplate = ({
  name,
  leadId,
}: WelcomeProposalTemplateProps) => {
  const proposalUrl = `http://localhost:4321/proposal?mode=features&id=${leadId}`;
  const previewText = "We’ve received your submission and prepared a proposal.";

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
              Thanks for reaching out! We’ve received your submission and started
              putting together a proposal tailored to your project.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              You can access your proposal using the link below:
            </Text>

            <Section className="text-center my-[24px]">
              <Link
                href={proposalUrl}
                className="bg-black text-white px-4 py-2 rounded no-underline text-[14px]"
              >
                View your proposal
              </Link>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              Please add the necessary information about the features you’d like
              for your project. Once your input is complete, you’ll be able to
              review the finalized proposal at the same link.
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
