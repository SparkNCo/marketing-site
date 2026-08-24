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

interface ArchitectReportTemplateProps {
  stackName: string;
  tagline: string;
  writeup: string;
  sampleRepoUrl?: string;
  bookingUrl: string;
}

const ArchitectReportTemplate = ({
  stackName,
  tagline,
  writeup,
  sampleRepoUrl,
  bookingUrl,
}: ArchitectReportTemplateProps) => {
  const previewText = `Your recommended stack: ${stackName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[520px] rounded border border-solid border-[#eaeaea] p-[24px]">
            <Text className="m-0 text-[13px] font-bold tracking-wide text-[#f78035]">
              spark/co
            </Text>

            <Heading className="mx-0 mt-2 p-0 text-[22px] font-normal text-black">
              Your recommended architecture
            </Heading>

            <Text className="text-[14px] leading-[24px] text-black">
              Thanks for using our architecture diagnostic. Based on your
              answers, we&apos;d start you on one of our pre-built template
              stacks:
            </Text>

            <Section className="my-[16px] rounded bg-[#f7f4f0] p-[16px]">
              <Text className="m-0 text-[18px] font-bold text-black">
                {stackName}
              </Text>
              {tagline ? (
                <Text className="m-0 mt-1 text-[13px] text-[#666]">{tagline}</Text>
              ) : null}
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">
              {writeup}
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              We&apos;ve attached a PDF with the full reasoning behind the
              technical decisions and trade-offs.
            </Text>

            {sampleRepoUrl ? (
              <>
                <Text className="mb-1 text-[14px] font-medium leading-[24px] text-black">
                  Sample repository
                </Text>
                <Section className="my-[8px]">
                  <Link
                    href={sampleRepoUrl}
                    className="rounded bg-black px-4 py-2 text-[14px] text-white no-underline"
                  >
                    View the sample repo
                  </Link>
                </Section>
              </>
            ) : null}

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[14px] leading-[24px] text-black">
              Want to review your product with us?
            </Text>
            <Section className="my-[8px]">
              <Link
                href={bookingUrl}
                className="rounded bg-[#f78035] px-4 py-2 text-[14px] font-bold text-black no-underline"
              >
                Book 20 minutes
              </Link>
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[13px] leading-[22px] text-gray-600">
              — The spark/co team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ArchitectReportTemplate;
