"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface BoardProviderProps {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<React.ReactNode> | null;
}

export const BoardProvider = ({
  roomId,
  children,
  fallback,
}: BoardProviderProps) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
