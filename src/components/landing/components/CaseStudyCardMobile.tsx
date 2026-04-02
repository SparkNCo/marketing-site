type CaseStudy = {
  id: number;
  title: string;
  subtitle: string;
  review: string;
  author: string;
  role: string;
};

export function CaseStudyCardMobile({ study }: { study: CaseStudy }) {
  return (
    <div className="flex h-full min-h-[28rem] w-[45vw] max-w-md flex-shrink-0 flex-col self-stretch bg-white overflow-hidden shadow-md">
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

      {/* Images */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden">
        {/* Small square (top layer) */}
        <div className="absolute bottom-0 left-0 w-3/5 h-3/5 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#111111]" />
        </div>

        {/* Large background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
        </div>
      </div>
    </div>
  );
}