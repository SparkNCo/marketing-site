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
    <div className="w-[45vw] max-w-md bg-white  overflow-hidden shadow-md flex-shrink-0">
      {/* Content */}
      <div className="p-6 flex flex-col justify-between">
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

        <p className="text-sm text-black font-semibold mt-4">
          {study.author},{" "}
          <span className="text-[#F78035]">{study.role}</span>
        </p>
      </div>

      {/* Images */}
      <div className="relative w-full h-40 overflow-hidden">
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