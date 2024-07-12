"use client";

import { memo } from "react";
import { useOther } from "@liveblocks/react/suspense";
import { connectionIdToColor } from "@/lib/utils";

import { MousePointer2 } from "lucide-react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || "Teammate";
  const connectionIdColor = connectionIdToColor(connectionId);

  if (!cursor) return null;

  const { x, y } = cursor;

  return (
    <foreignObject
      className="relative drop-shadow-md"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
    >
      <MousePointer2
        className="h-5 w-5"
        style={{ fill: connectionIdColor, color: connectionIdColor }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdColor }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
