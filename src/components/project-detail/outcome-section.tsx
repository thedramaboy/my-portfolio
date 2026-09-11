import CaseStudySection from "./case-study-section";

type Props = { content: string };

export default function OutcomeSection({ content }: Props) {
  return (
    <CaseStudySection title="Results & impact">
      <p>{content}</p>
    </CaseStudySection>
  );
}
