// Login and register stay off until a backend exists. Set NEXT_PUBLIC_AUTH_ENABLED=true to turn them on.
export const isAuthEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";
