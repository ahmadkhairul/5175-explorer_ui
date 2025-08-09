export const getAllowedOrigins = (): string | string[] => {
  const envOrigins = import.meta.env.VITE_APP_ACCESS_CONTROL_URL

  // fallback local if env null
  if (!envOrigins || envOrigins.trim() === "") {
    return "http://localhost:5172";
  }

  // split env to several origins separated by comma
  const origins = envOrigins
    .split(",")
    .map((origin: string) => origin.trim())
    .filter(Boolean);

  // if only 1 return
  if (origins.length === 1) {
    return origins[0];
  }

  // if more than 1 return as array
  return origins;
};
