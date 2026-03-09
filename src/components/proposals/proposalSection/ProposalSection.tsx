"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";
import CoverPageRenderer from "./SectionRenderer/CoverPageRenderer";

interface ProposalSectionProps {
  title: string;
  data: any;
  setProposal: (data: any) => void;
  dbUser?: { role?: string };
}

export default function ProposalSection({
  title,
  data,
  setProposal,
  dbUser,
}: ProposalSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState<any>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const toggleEdit = () => {
    if (isEditing) {
      setProposal(localData);
    }
    setIsEditing(!isEditing);
  };

  // ✅ SPECIAL CASE
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
    <section className="mb-6 w-[80vw]">
      <SectionHeader
        title={title}
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
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