import { useMemo } from "react";
import { bedroomArtifacts } from "../data/artifacts";

/**
 * The secret latch: the curator's private items (the drawer
 * letter and the bracelet) stay hidden until the visitor has
 * viewed every non-secret bedroom artifact. Then the room
 * quietly reveals what it was hiding.
 */
export function useDiscoveredSecrets(viewed: ReadonlySet<string>) {
  const revealIds = useMemo(
    () => bedroomArtifacts.filter((a) => !a.isSecret),
    []
  );

  const secretsUnlocked = useMemo(
    () => revealIds.every(({ id }) => viewed.has(id)),
    [revealIds, viewed]
  );

  return { secretsUnlocked };
}
