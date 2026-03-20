type CaseStudy = {
  id: number;
  title: string;
  review: string;
  author: string;
  role: string;
};

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="max-w-[45rem] h-[220px] bg-white  overflow-hidden shadow-md flex-shrink-0 relative">
      {/* Content */}
      <div className="p-6 pr-[38%] h-full flex flex-col justify-between">
        <div>
          <h3 className="text-heading2 font-bold text-black mb-3 ">
            {study.title}
          </h3>

          <p className="text-body text-gray-700 italic leading-relaxed line-clamp-5 w-3/4">
            "{study.review}"
          </p>
        </div>

        <p className="text-body text-black font-semibold mt-4">
          {study.author}, <span className="text-[#F78035]">{study.role}</span>
        </p>
      </div>

      {/* Orange block */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1/3 h-4/5  shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
      </div>

      {/* Black block */}
      <div className="absolute right-48 top-16 w-1/5 h-3/5  shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#000000]" />
      </div>
    </div>
  );
}
