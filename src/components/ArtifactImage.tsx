import { useState } from "react";
import ArtifactGlyph from "./ArtifactGlyph";
import { getArtifact } from "../data/artifacts";

/**
 * ARTIFACT IMAGE
 * ==============
 * Renders the real photo of an artifact when one exists
 * (`public/artifacts/<id>.jpg` by convention, or artifact.imageUrl),
 * styled with the museum's "messy nostalgia" treatment: a slight
 * tilt, a deep drop shadow, and a warm dark-room filter so photos
 * look taken at midnight under the desk lamp.
 *
 * Missing file / broken URL → elegant fallback to the CSS glyph.
 * Never shows a broken-image icon.
 */
export default function ArtifactImage({
  id,
  className = "",
  alt,
}: {
  id: string;
  className?: string;
  alt?: string;
}) {
  const artifact = getArtifact(id);
  const src = artifact?.imageUrl ?? `/artifacts/${id}.jpg`;
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ArtifactGlyph id={id} className={className} />;
  }

  return (
    <span className={`artifact-photo ${className}`}>
      <img
        src={src}
        alt={alt ?? (artifact ? `${artifact.title} — ${artifact.objectName}` : "Museum artifact")}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
