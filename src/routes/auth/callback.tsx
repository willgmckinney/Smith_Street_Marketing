import { createRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { consumePostSigninTarget, isAuthConfigured, useAuth } from "../../lib/auth";
import { rootRoute } from "../__root";

export const authCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/callback",
  component: function AuthCallbackComponent() {
    if (!isAuthConfigured) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] text-granite/70 text-sm">
          Auth is not configured. Set the VITE_COGNITO_* env vars.
        </div>
      );
    }
    return <AuthCallbackInner />;
  },
});

function AuthCallbackInner() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const target = consumePostSigninTarget("/quick-demo");
      void navigate({ to: target });
    }
  }, [auth.isAuthenticated, navigate]);

  if (auth.error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="max-w-md text-center">
          <h2 className="font-display text-xl font-bold text-white mb-2">
            Sign-in failed
          </h2>
          <p className="text-granite/80 text-sm">{auth.error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-golden-hour-start animate-spin" />
      <p className="text-granite/80 text-sm">Signing you in…</p>
    </div>
  );
}
