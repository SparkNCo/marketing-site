type CaseStudy = {
  id: number;
  title: string;
  subtitle: string;
  review: string;
  author: string;
  role: string;
  primaryImage?: string;
  secondaryImage?: string;
};

export function CaseStudyCardMobile({ study }: Readonly<{ study: CaseStudy }>) {
  return (
    <a
      href="/case-studies"
      className="flex h-full min-h-[28rem] w-[45vw] max-w-md flex-shrink-0 flex-col self-stretch bg-white overflow-hidden shadow-md no-underline text-inherit cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F78035]"
      aria-label={`View case studies - ${study.title}`}
    >
      {/* Content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col p-6 pb-0">
        <div>
          <h3 className="text-lg font-bold text-black mb-1">
            {study.title}
          </h3>
          <p className="text-xs text-gray-600 leading-snug mb-2 line-clamp-2">
            {study.subtitle}
          </p>

          <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-4">
            "{study.review}"
          </p>
        </div>

        <p className="mt-4 shrink-0 text-sm font-semibold text-black">
          {study.author},{" "}
          <span className="text-[#F78035]">{study.role}</span>
        </p>

        <div className="min-h-0 min-w-0 flex-1" aria-hidden />
      </div>

      {/* Orange block - 16:9, full card width on mobile */}
      <div className="relative w-full shrink-0 overflow-hidden shadow-lg aspect-[16/9]">
        {study.primaryImage ? (
          <img
            src={study.primaryImage}
            alt={`${study.title} showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
        )}

        <div className="absolute left-0 bottom-0 h-2/5 w-auto aspect-[16/9] shadow-lg overflow-hidden">
          {study.secondaryImage ? (
            <img
              src={study.secondaryImage}
              alt={`${study.title} secondary showcase`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#111111]" />
          )}
        </div>
      </div>
    </a>
  );
}