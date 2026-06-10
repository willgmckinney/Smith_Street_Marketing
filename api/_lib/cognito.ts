import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

/**
 * Verifies a Cognito access token (NOT id token).
 *
 * Cognito access-token JWTs put the OAuth2 client id in a `client_id` claim
 * rather than the standard `aud` claim, so we verify `iss` automatically via
 * jose, then check `client_id` and `token_use` manually.
 */

const issuer = process.env.COGNITO_ISSUER;
const clientId = process.env.COGNITO_CLIENT_ID;

if (!issuer || !clientId) {
  console.warn(
    "[cognito] COGNITO_ISSUER and/or COGNITO_CLIENT_ID env vars are not set. " +
      "Requests will be rejected until you configure these in the Vercel project.",
  );
}

const jwksUrl = issuer ? new URL(`${issuer}/.well-known/jwks.json`) : null;
const jwks = jwksUrl ? createRemoteJWKSet(jwksUrl) : null;

export type VerifiedAccessToken = JWTPayload & {
  client_id: string;
  token_use: "access";
  username?: string;
  sub: string;
};

export async function verifyCognitoAccessToken(
  token: string,
): Promise<VerifiedAccessToken> {
  if (!issuer || !clientId || !jwks) {
    throw new Error(
      "Auth not configured (COGNITO_ISSUER / COGNITO_CLIENT_ID missing).",
    );
  }

  const { payload } = await jwtVerify(token, jwks, { issuer });

  if (payload.token_use !== "access") {
    throw new Error(`Expected access token, got token_use="${payload.token_use}"`);
  }
  if (payload.client_id !== clientId) {
    throw new Error("Token client_id does not match COGNITO_CLIENT_ID.");
  }

  return payload as VerifiedAccessToken;
}
