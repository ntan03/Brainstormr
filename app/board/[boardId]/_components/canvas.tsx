"use client";

import { useState } from "react";
import { CanvasMode, CanvasState } from "@/app/types/canvas";
import { useHistory, useCanUndo, useCanRedo } from "@liveblocks/react/suspense";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const undo = () => {
    history.undo();
  };

  const redo = () => {
    history.redo();
  };

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  );
};
