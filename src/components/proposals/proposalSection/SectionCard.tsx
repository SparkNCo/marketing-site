import { Card } from "../../ui/card";
import SectionRenderer from "./SectionRenderer/SectionRenderer";

export default function SectionCard({
  key,
  localData,
  setLocalData,
  isEditing,
}: any) {
  return (
    <Card className=" bg-card p-8">
      <SectionRenderer
        sectionKey={key}
        data={localData}
        setData={setLocalData}
        isEditing={isEditing}
      />
    </Card>
  );
}
