import React from "react";

interface ImpactProgramCardProps {
  image: string;
  title: string;
  description: string;
}

const ImpactProgramCard: React.FC<ImpactProgramCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <article className="w-full flex flex-col bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-full h-64 overflow-hidden bg-background">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
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
