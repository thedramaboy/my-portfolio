import CaseStudySection from "./case-study-section";
import { Challenge } from "@/lib/projects-data";

type Props = { challenges: Challenge[] };

export default function ChallengesSection({ challenges }: Props) {
  return (
    <CaseStudySection title="Challenges & solutions">
      <div className="space-y-6">
        {challenges.map((item, i) => (
          <div key={i} className="border border-border rounded-sm p-5 space-y-4">
            <p className="text-sm font-medium">
              <span className="font-mono text-muted-foreground/40 mr-2">
                {String(i + 1).padStart(2, "0")} —
              </span>
              {item.title}
            </p>

            <div className="space-y-3">
              <Block label="Problem" content={item.problem} />
              {item.investigation && (
                <Block label="Investigation" content={item.investigation} />
              )}
              <Block label="Solution" content={item.solution} />
              {item.result && (
                <Block label="Result" content={item.result} />
              )}
            </div>
          </div>
        ))}
      </div>
    </CaseStudySection>
  );
}

function Block({ label, content }: { label: string; content: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/40">
        {label}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
