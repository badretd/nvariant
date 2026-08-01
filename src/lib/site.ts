const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (deploymentHost ? `https://${deploymentHost}` : "https://n-variant.example");

export const siteName = "N-вариант";
export const siteDescription =
  "N-вариант — цифровой журнал и архив творческих попыток, идей, историй и новых вариантов.";
