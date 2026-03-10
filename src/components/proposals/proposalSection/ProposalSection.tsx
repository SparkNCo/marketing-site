"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";
import CoverPageRenderer from "./SectionRenderer/CoverPageRenderer";

interface ProposalSectionProps {
  title: string;
  data: any;
  openSections: string[];
  setOpenSections: (sections: string[]) => void;
  setProposal: (data: any) => void;
  dbUser?: { role?: string };
}

export default function ProposalSection({
  title,
  data,
  setProposal,
  openSections,
  setOpenSections,
  dbUser,
}: ProposalSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState<any>(data);
  const isOpen = openSections.includes(title);

  const toggleOpen = () => {
    if (openSections.includes(title)) {
      setOpenSections(openSections.filter((s) => s !== title));
    } else {
      setOpenSections([...openSections, title]);
    }
  };

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const toggleEdit = () => {
    if (isEditing) {
      setProposal(localData);
    }
    setIsEditing(!isEditing);
  };

  if (title === "Cover Page") {
    return (
      <section className="mb-6 w-[80vw]">
        <CoverPageRenderer
          data={localData}
          setData={setLocalData}
          isEditing={isEditing}
        />
      </section>
    );
  }

  return (
    <section className="mb-6 w-[80vw] bg-foreground">
      <SectionHeader
        title={title}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        dbUser={dbUser}
      />

      {isOpen && (
        <SectionCard
          key={title}
          title={title}
          localData={localData}
          setLocalData={setLocalData}
          isEditing={isEditing}
        />
      )}
    </section>
  );
}
