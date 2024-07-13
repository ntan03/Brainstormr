import { Kalam } from "next/font/google";
import { useMutation } from "@liveblocks/react";

import { NoteLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const scaleFactor = 0.15;

  const maxFontSize = 96;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;

  return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
};

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, height, width, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      className="shadow-md drop-shadow-xl"
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
        html={value || "Text"}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};
