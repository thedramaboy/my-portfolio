import Image from "next/image";
import CaseStudySection from "./case-study-section";
import { Diagram } from "@/lib/projects-data";

type Props = { diagram: Diagram };

export default function DiagramSection({ diagram }: Props) {
  return (
    <CaseStudySection title={diagram.label}>
      <div className="space-y-5">
        <div className="border border-border rounded-sm overflow-hidden">
          <Image
            src={diagram.src}
            alt={diagram.label}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
        <ul className="space-y-2">
          {diagram.notes.map((note, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="font-mono text-muted-foreground/40 shrink-0">—</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </CaseStudySection>
  );
}
