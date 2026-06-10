import { WebStorageStateStore } from "oidc-client-ts";
import { useEffect, type PropsWithChildren } from "react";
import {
  AuthProvider as OidcAuthProvider,
  useAuth as useOidcAuth,
  type AuthContextProps,
} from "react-oidc-context";

const authority = import.meta.env.VITE_COGNITO_AUTHORITY as string | undefined;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string | undefined;
const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN as string | undefined;

export const isAuthConfigured = Boolean(authority && clientId && cognitoDomain);

const oidcConfig = {
  authority: authority ?? "",
  client_id: clientId ?? "",
  redirect_uri:
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "",
  post_logout_redirect_uri:
    typeof window !== "undefined" ? `${window.location.origin}/` : "",
  response_type: "code",
  scope: "openid email profile",
  userStore:
    typeof window !== "undefined"
      ? new WebStorageStateStore({ store: window.localStorage })
      : undefined,
  // We let react-oidc-context process the code exchange when the user lands on
  // /auth/callback. The actual post-login redirect happens in the route component
  // via TanStack Router so navigation state stays consistent.
  onSigninCallback: () => {
    // Strip ?code=... from the URL so back/refresh don't try to redeem it again.
    window.history.replaceState({}, document.title, "/auth/callback");
  },
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  if (!isAuthConfigured) {
    // Render children without auth context — RequireAuth will surface a friendly
    // "configure your env vars" message on protected pages.
    return <>{children}</>;
  }
  return <OidcAuthProvider {...oidcConfig}>{children}</OidcAuthProvider>;
};

export const useAuth = useOidcAuth;

const SIGNIN_TARGET_KEY = "smithave.postSigninTarget";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  if (!isAuthConfigured) return <AuthNotConfiguredNotice />;
  return <RequireAuthInner>{children}</RequireAuthInner>;
};

function RequireAuthInner({ children }: PropsWithChildren) {
  const auth = useAuth();

  useEffect(() => {
    if (
      !auth.isLoading &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.error
    ) {
      try {
        sessionStorage.setItem(
          SIGNIN_TARGET_KEY,
          window.location.pathname + window.location.search,
        );
      } catch {
        // sessionStorage may be unavailable; fall through and just redirect.
      }
      void auth.signinRedirect();
    }
  }, [auth, auth.isLoading, auth.isAuthenticated, auth.activeNavigator, auth.error]);

  if (auth.error) {
    return (
      <FullPageMessage
        title="Sign-in failed"
        body={auth.error.message}
        action={
          <button
            type="button"
            onClick={() => void auth.signinRedirect()}
            className="mt-4 px-6 py-2 rounded-pill bg-golden-gradient text-deep-horizon font-bold"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (auth.isLoading || auth.activeNavigator) {
    return <FullPageSpinner label="Checking your session…" />;
  }

  if (!auth.isAuthenticated) {
    return <FullPageSpinner label="Redirecting to sign in…" />;
  }

  return <>{children}</>;
}

export function consumePostSigninTarget(fallback = "/quick-demo"): string {
  try {
    const target = sessionStorage.getItem(SIGNIN_TARGET_KEY);
    if (target) sessionStorage.removeItem(SIGNIN_TARGET_KEY);
    return target || fallback;
  } catch {
    return fallback;
  }
}

export function signOut(auth: AuthContextProps): void {
  const idToken = auth.user?.id_token;
  void auth.removeUser();
  if (!cognitoDomain || !clientId) {
    window.location.assign("/");
    return;
  }
  const logoutUrl = new URL(`https://${cognitoDomain}/logout`);
  logoutUrl.searchParams.set("client_id", clientId);
  logoutUrl.searchParams.set("logout_uri", `${window.location.origin}/`);
  if (idToken) logoutUrl.searchParams.set("id_token_hint", idToken);
  window.location.assign(logoutUrl.toString());
}

// ---------- UI helpers ----------

function FullPageSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-golden-hour-start animate-spin" />
      <p className="text-granite/80 font-sans text-sm">{label}</p>
    </div>
  );
}

function FullPageMessage({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="max-w-lg w-full bg-atmospheric-haze rounded-card p-8 border border-white/10 shadow-rim-card text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-3">
          {title}
        </h2>
        <p className="text-granite/80 text-sm whitespace-pre-wrap">{body}</p>
        {action}
      </div>
    </div>
  );
}

function AuthNotConfiguredNotice() {
  return (
    <FullPageMessage
      title="Auth not configured"
      body={
        "This page is gated behind Amazon Cognito sign-in. Configure these env vars to enable it:\n\n" +
        "VITE_COGNITO_AUTHORITY\nVITE_COGNITO_CLIENT_ID\nVITE_COGNITO_DOMAIN\n\n" +
        "See docs/quick-suite-embedding-setup.md for full setup steps."
      }
    />
  );
}
