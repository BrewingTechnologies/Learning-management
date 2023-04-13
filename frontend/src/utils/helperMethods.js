import Roles from "../config/Roles";
import { getRole } from "./authentication";

export function getURLParams(keys) {
  if (typeof window !== "undefined") {
    if (Array.isArray(keys)) {
      const url = new URL(window.location.href);
      const values = {};
      keys.forEach((key) => {
        values[key] = url.searchParams.get(key);
      });
      return values;
    }
    return new URL(window.location.href).searchParams.get(keys);
  }
  return null;
}

export function getLogoutURL() {
  const roleKey = Object.keys(Roles || {}).find(
    (rKey) => Roles[rKey] === getRole()
  );
  return `/login/${roleKey}`;
}
