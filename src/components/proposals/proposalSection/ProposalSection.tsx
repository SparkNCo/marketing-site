"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";
import CoverPageRenderer from "./SectionRenderer/CoverPageRenderer";

type ProposalSectionProps = {
  title: string;
  data: Record<string, unknown>;
  openSections: string[];
  setOpenSections: (sections: string[]) => void;
  setProposal: (data: Record<string, unknown>) => void;
  dbUser?: { role?: string };
};

export default function ProposalSection({
  title,
  data,
  setProposal,
  openSections,
  setOpenSections,
  dbUser,
}: Readonly<ProposalSectionProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState<Record<string, unknown>>(data);
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
      <section className="  ">
        <CoverPageRenderer
          data={localData}
          setData={setLocalData}
          isEditing={isEditing}
        />
      </section>
    );
  }

  return (
    <section className="  bg-card ">
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
          title={title}
          localData={localData}
          setLocalData={setLocalData}
          isEditing={isEditing}
        />
      )}
    </section>
  );
}
