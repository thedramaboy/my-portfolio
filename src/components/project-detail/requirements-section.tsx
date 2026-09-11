import CaseStudySection from "./case-study-section";

type Props = { content: string };

export default function RequirementsSection({ content }: Props) {
  return (
    <CaseStudySection title="Requirements & business rules">
      <p>{content}</p>
    </CaseStudySection>
  );
}
