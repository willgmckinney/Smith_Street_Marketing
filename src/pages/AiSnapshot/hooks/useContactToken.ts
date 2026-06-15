import { useLocation } from "@tanstack/react-router";
import { decodeContactToken } from "../../../lib/state/token";

export function useContactToken() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("c");
  const contact = decodeContactToken(token);
  return { token, contact };
}
