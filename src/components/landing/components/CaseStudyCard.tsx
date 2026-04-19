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

export function CaseStudyCard({ study }: Readonly<{ study: CaseStudy }>) {
  return (
    <a
      href="/case-studies"
      className="max-w-[65rem] min-h-[360px] h-[360px] bg-white overflow-hidden shadow-md flex-shrink-0 relative block no-underline text-inherit cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F78035]"
      aria-label={`View case studies — ${study.title}`}
    >
      {/* Content */}
      <div className="p-6 pr-[calc(0.75rem+360px*64/45)] h-full flex flex-col justify-between">
        <div>
          <h3 className="text-heading2 font-bold text-black mb-1 ">
            {study.title}
          </h3>
          <p className="text-smalltext text-gray-600 leading-snug mb-3 line-clamp-2 w-4/5">
            {study.subtitle}
          </p>

          <p className="text-body text-gray-700 italic leading-relaxed line-clamp-4 w-4/5">
            "{study.review}"
          </p>
        </div>

        <p className="text-body text-black font-semibold mt-4">
          {study.author}, <span className="text-[#F78035]">{study.role}</span>
        </p>
      </div>

      {/* Orange block — 16:9, full card height on desktop */}
      <div className="absolute right-0 bottom-0 h-4/5 w-auto aspect-[16/9] shadow-lg overflow-hidden">
        {study.primaryImage ? (
          <img
            src={study.primaryImage}
            alt={`${study.title} showcase`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
        )}
      </div>

      {/* Black block */}
      <div className="absolute right-[calc(100%-360px*16/9)] bottom-0 h-2/5 w-auto aspect-[16/9] shadow-lg overflow-hidden">
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
    </a>
  );
}
