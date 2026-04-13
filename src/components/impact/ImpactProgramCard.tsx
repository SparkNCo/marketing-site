import React from "react";
import { Clock } from "lucide-react";

interface ImpactProgramCardProps {
  image?: string;
  title: string;
  description: string;
}

const ImpactProgramCard: React.FC<ImpactProgramCardProps> = ({
  image,
  title,
  description,
}) => {
  const imageSrc = image?.trim() ?? "";
  const showImage = imageSrc.length > 0;

  return (
    <article className="w-full flex flex-col bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {showImage ? (
        <div className="h-64 w-full overflow-hidden bg-background">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-card text-background">
          <Clock
            className="h-16 w-16 shrink-0 text-background"
            strokeWidth={2.5}
            aria-hidden
          />
          <span className="text-body font-bold uppercase tracking-widest text-background">
            Coming soon
          </span>
        </div>
      )}
      <div className="p-6 flex flex-col gap-3">
        <h3 className="text-heading2 font-bold text-background">{title}</h3>
        <p className="text-body text-background leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ImpactProgramCard;
