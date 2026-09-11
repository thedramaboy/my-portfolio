import CaseStudySection from "./case-study-section";

type Props = { content: string };

export default function DatabaseSection({ content }: Props) {
  return (
    <CaseStudySection title="Data model & database design">
      <p>{content}</p>
    </CaseStudySection>
  );
}
