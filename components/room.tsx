"use client";

import { Loading } from "@/app/board/[boardId]/_components/loading";
import { BoardProvider } from "@/providers/board-providers";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
}

export const Room = ({ roomId, children }: RoomProps) => {
  return (
    <BoardProvider roomId={roomId} fallback={<Loading />}>
      {children}
    </BoardProvider>
  );
};
