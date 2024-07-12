"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_OTHER_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const self = useSelf();
  const excessUsers = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
              borderColor={connectionIdToColor(connectionId)}
            />
          );
        })}
        {self && (
          <UserAvatar
            src={self.info?.picture}
            name={self.info?.name}
            fallback={self.info?.name?.[0]}
            borderColor={connectionIdToColor(self.connectionId)}
          />
        )}
        {excessUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_OTHER_USERS} more users`}
            fallback={`+${users.length - MAX_SHOWN_OTHER_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};
