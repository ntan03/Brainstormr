import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";

interface PathProps {
  x: number;
  y: number;
  points: Array<Array<number>>;
  onPointerDown?: (e: React.PointerEvent) => void;
  fill: string;
  stroke?: string;
}

export const Path = ({
  x,
  y,
  points,
  onPointerDown,
  fill,
  stroke,
}: PathProps) => {
  return (
    <path
      className="drop-shadow-md"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onPointerDown={onPointerDown}
      x={x}
      y={y}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};
