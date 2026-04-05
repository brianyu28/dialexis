import { Presentation } from "presenter";

import { SparkColor } from "./SparkConstants";

export function SparkPresentation(props: Partial<Presentation> | null = null): Presentation {
  return Presentation({
    backgroundColor: SparkColor.BACKGROUND,
    ...props,
  });
}
