"use client";

import { memo } from "react";
import { useMutation, useSelf } from "@liveblocks/react";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

import { Camera, Color } from "@/types/canvas";

import { ColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    // Change fill color hook
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    // Bring to front / send to back
    const bringToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const arr = liveLayerIds.toImmutable();

        const indices: Array<number> = [];
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) indices.push(i);
        }

        // Positioning is dependent on their position in the array
        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const sendToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const arr = liveLayerIds.toImmutable();

        const indices: Array<number> = [];
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) indices.push(i);
        }

        // Positioning is dependent on their position in the array
        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    // Delete layer hook
    const deleteLayers = useDeleteLayers();

    // Moved to bottom due to issues with hook count between renders (unselecting crashes)
    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
            calc(${x}px - 50%), 
            calc(${y - 16}px - 100%)
        )`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={bringToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom">
            <Button variant="board" size="icon" onClick={sendToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
