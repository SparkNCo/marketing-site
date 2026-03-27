import {
  FileText,
  Pencil,
  Save,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../ui/button";

export default function SectionHeader({
  title,
  isOpen,
  toggleOpen,
  isEditing,
  toggleEdit,
  dbUser,
}: any) {
  return (
    <div
      onClick={toggleOpen}
      className="mb-6 flex items-center justify-between cursor-pointer text-background bg-card p-4  "
    >
      <div className="flex items-center gap-3">
        <h2 className="text-heading2 font-bold text-background">{title}</h2>
      </div>

      <div className="flex flex-row gap-6 text-foreground ">
        {isOpen && dbUser?.role === "admin" && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleEdit();
            }}
            className="flex items-center gap-2 "
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" /> Edit
              </>
            )}
          </Button>
        )}
        {isOpen ? (
          <ChevronRight className="h-6 w-6 text-background" />
        ) : (
          <ChevronDown className="h-6 w-6 text-background" />
        )}
      </div>
    </div>
  );
}
