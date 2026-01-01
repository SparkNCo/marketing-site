function CaseStudiesSection() {
  const caseStudies = [
    {
      id: 1,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 2,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 3,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 4,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 5,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
    {
      id: 6,
      title: "Title",
      review:
        "Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected, Some quote to be collected...",
      author: "Sash Alagh",
      role: "CEO",
    },
  ];

  return (
    <section className="bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl text-foreground md:text-5xl font-bold mb-12 text-center">
          Case Studies
        </h2>
      </div>

      <div className="relative mb-12 overflow-hidden">
        <div className="animate-scroll-right">
          {[...caseStudies, ...caseStudies].map((study, index) => (
            <div
              key={`top-${index}`}
              className="max-w-[45rem] h-[220px] bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 relative"
            >
              {/* Content */}
              <div className="p-6 pr-[38%] h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">
                    {study.title}
                  </h3>

                  <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-5 w-3/4">
                    "{study.review}"
                  </p>
                </div>

                <p className="text-sm text-black font-semibold mt-4">
                  {study.author},{" "}
                  <span className="text-[#F78035]">{study.role}</span>
                </p>
              </div>

              {/* Orange image block */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1/3 h-4/5 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
              </div>
              <div className="absolute right-48 top-16 w-1/5 h-3/5 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#000000]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="animate-scroll-left">
          {[...caseStudies, ...caseStudies].map((study, index) => (
            <div
              key={`top-${index}`}
              className="max-w-[45rem] h-[220px] bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 relative"
            >
              <div className="p-6 pr-[38%] h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">
                    {study.title}
                  </h3>

                  <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-5 w-3/4">
                    "{study.review}"
                  </p>
                </div>

                <p className="text-sm text-black font-semibold mt-4">
                  {study.author},{" "}
                  <span className="text-[#F78035]">{study.role}</span>
                </p>
              </div>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1/3 h-4/5 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B65F28] to-[#F78035]" />
              </div>
              <div className="absolute right-48 top-16 w-1/5 h-3/5 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020202] to-[#000000]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
