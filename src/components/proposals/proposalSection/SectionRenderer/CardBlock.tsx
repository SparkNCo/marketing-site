export default function CardBlock({ block }: any) {
  const { subtype, title, content } = block;

  /* ---------------- REFERENCE ---------------- */

  if (subtype === "Reference") {
    const ref = content?.[0];

    return (
      <div className="border rounded-xl p-6 bg-muted/30">
        <p className="italic text-sm leading-relaxed">"{ref.quote}"</p>

        <div className="mt-4 text-sm">
          <p className="font-semibold">{ref.author}</p>
          <p className="text-muted-foreground">
            {ref.position} — {ref.company}
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- CASE STUDY ---------------- */

  if (subtype === "Cases") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30">
        {title && <h3 className="font-semibold mb-4">{title}</h3>}

        <div className="space-y-3 text-sm">
          {content?.map((item: any, i: number) => (
            <div key={i}>
              <span className="font-semibold">{item.title}: </span>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- TECHNOLOGY ---------------- */

  if (subtype === "Technology") {
    const tech = content?.[0];

    return (
      <div className="border rounded-xl p-6 bg-muted/30">
        <h3 className="font-semibold mb-3">{title}</h3>

        <div className="text-sm space-y-2">
          <div>
            <span className="font-semibold">Purpose: </span>
            {tech.Purpose}
          </div>

          <div>
            <span className="font-semibold">Motive: </span>
            {tech.Motive}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- TEAM ---------------- */

  if (subtype === "Team") {
    const member = content?.[0];

    return (
      <div className="border rounded-xl p-6 bg-muted/30 w-full ">
        <h3 className="font-semibold mb-2">{title}</h3>

        <div className="text-sm">
          <div>
            <span className="font-semibold">Role: </span>
            {member.Purpose}
          </div>

          <div>
            <span className="font-semibold">Allocation: </span>
            {member.Motive}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- TIMELINE ---------------- */

  if (subtype === "timeline") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30">
        <h3 className="font-semibold mb-3">{title}</h3>

        <p className="text-sm leading-relaxed">{content?.text}</p>
      </div>
    );
  }

  if (subtype === "Deliverable") {
    return (
      <div className="border rounded-xl p-6 bg-muted/30">
        <h3 className="font-semibold mb-3">{title}</h3>

        <p className="text-sm mb-3">{content.text}</p>

        <p className="text-sm">
          <span className="font-semibold">Acceptance Criteria: </span>
          {content.acceptanceCriteria}
        </p>
      </div>
    );
  }

  return null;
}
