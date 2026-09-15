import Image from "next/image";
import CaseStudySection from "./case-study-section";

type Props = { images: string[] };

export default function ScreenshotsSection({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <CaseStudySection title="Screenshots">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <div key={i} className="shrink-0 rounded-sm overflow-hidden border border-border">
            <Image
              src={src}
              alt={`Screenshot ${i + 1}`}
              width={400}
              height={280}
              className="h-52 w-auto object-cover"
            />
          </div>
        ))}
      </div>
    </CaseStudySection>
  );
}
