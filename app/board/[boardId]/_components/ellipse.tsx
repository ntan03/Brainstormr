import { EllipseLayer } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {
  const { x, y, height, width, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      style={{
        transform: `translate(
          ${x}px, 
          ${y}px
        )`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
      onPointerDown={(e) => onPointerDown(e, id)}
    />
  );
};
