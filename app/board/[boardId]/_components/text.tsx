import { Kalam } from "next/font/google";
import { useMutation } from "@liveblocks/react";

import { TextLayer } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const scaleFactor = 0.5;

  const maxFontSize = 96;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;

  return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
};

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
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
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : "#000",
        }}
        html={value || "Text"}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};
