import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CaseStudySection({ title, children }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="pl-8 text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}
