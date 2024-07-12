"use client";

import { memo } from "react";
import { useSelf, useStorage } from "@liveblocks/react/suspense";

import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
  onResizeHandlerPointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlerPointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();
    if (!bounds) return null;

    // Resize corners start top-left and goes clockwise
    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                    ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
                )`,
              }}
              x={0}
              y={0}
              onPointerDown={(e) => {
                e.stopPropagation();
                // TODO: Add resize handler
              }}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";