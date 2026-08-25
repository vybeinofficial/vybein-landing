export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vybein.com";

/** Blog/API base URL. Set `API_BASE_URL` on Vercel (server-only) to the public HTTPS API so SSR stays correct even if `NEXT_PUBLIC_API_BASE_URL` is localhost for local dev builds. Client code still falls back to `NEXT_PUBLIC_*` then default. */
export const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://vybein.apnapackers.in/api/v1";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.vybein.vybein&pcampaignid=web_share";

export const APP_NAME = "Vybein";

/** Override in `.env` with your real profile URLs. */
export const SOCIAL_INSTAGRAM =
  process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/vybein.app";
export const SOCIAL_FACEBOOK =
  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || "https://www.facebook.com/share/1FKeet7532/";
export const SOCIAL_YOUTUBE =
  process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || "https://www.youtube.com/@Vybein_App";
export const SOCIAL_X =
  process.env.NEXT_PUBLIC_SOCIAL_X_URL || "https://x.com/vybein_app";
