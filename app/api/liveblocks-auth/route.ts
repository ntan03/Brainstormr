import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexHttpClient(convexUrl);

const secret = process.env.NEXT_PUBLIC_LIVEBLOCK_SECRET_KEY!;
const liveblocks = new Liveblocks({ secret });

export async function POST(request: Request) {
  const authorization = auth();
  const user = await currentUser();

  // Check for session
  if (!authorization || !user)
    return new Response("Unauthorized", { status: 403 });

  // Check if user has permission
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId)
    return new Response("Unauthorized", { status: 403 });

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };

  // Prepare user session
  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
