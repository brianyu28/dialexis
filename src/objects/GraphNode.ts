import { Anchor, Circle, Color, Group, Text } from "presenter";

import { SparkColor } from "../themes/spark/SparkConstants";
import { SparkText } from "../themes/spark/SparkText";

interface GraphNodeProps {
  readonly size: number;
  readonly x: number;
  readonly y: number;
  readonly opacity: number;
  readonly circleProps: Partial<Circle>;
  readonly groupProps: Partial<Group>;
  readonly textProps: Partial<Text> | undefined;
}

interface Return {
  readonly circle: Circle;
  readonly text: Text | undefined;
  readonly group: Group;
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly top: () => { x: number; y: number };
  readonly bottom: () => { x: number; y: number };
}

export function GraphNode(props: Partial<GraphNodeProps> = {}): Return {
  const {
    size = 200,
    x = 0,
    y = 0,
    opacity = 1,
    circleProps = {},
    groupProps = {},
    textProps = undefined,
  } = props;

  const circle = Circle({
    radius: size / 2,
    fillColor: SparkColor.PRIMARY,
    strokeColor: SparkColor.BLUE1,
    strokeWidth: size / 10,
    x: size / 2,
    y: size / 2,
    ...circleProps,
  });

  const text =
    textProps !== undefined
      ? SparkText(textProps.text ?? "", {
          anchor: Anchor.CENTER,
          color: Color.BLACK,
          x: size / 2,
          y: size / 2,
          fontSize: size * 0.5,
          ...textProps,
        })
      : undefined;

  const group = Group([circle, ...(text !== undefined ? [text] : [])], {
    width: size,
    height: size,
    x,
    y,
    anchor: Anchor.CENTER,
    opacity,
    ...groupProps,
  });

  function top() {
    return { x, y: y - size / 2 - 30 };
  }

  function bottom() {
    return { x, y: y + size / 2 + 30 };
  }

  return { circle, text, group, x, y, size, top, bottom };
}
