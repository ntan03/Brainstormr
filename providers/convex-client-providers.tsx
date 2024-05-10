"use client";

import Loading from "@/components/auth/loading";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProps {
  children: React.ReactNode;
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convexInstance = new ConvexReactClient(convexURL);

export const ConvexClientProvider = ({ children }: ConvexClientProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convexInstance}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
