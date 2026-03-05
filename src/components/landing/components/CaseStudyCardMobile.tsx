type CaseStudy = {
  id: number;
  title: string;
  review: string;
  author: string;
  role: string;
};

export function CaseStudyCardMobile({ study }: { study: CaseStudy }) {
  return (
    <div className="w-[45vw] max-w-md bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0">
      {/* Content */}
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-black mb-3">
            {study.title}
          </h3>

          <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-5">
            "{study.review}"
          </p>
        </div>

        <p className="text-sm text-black font-semibold mt-4">
          {study.author},{" "}
          <span className="text-[#F78035]">{study.role}</span>
        </p>
      </div>

      {/* Images */}
      <div className="flex w-full h-32">
        {/* Orange image */}
        <div className="w-1/2 h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
        </div>

        {/* Black image */}
        <div className="w-1/2 h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#000000]" />
        </div>
      </div>
    </div>
  );
}