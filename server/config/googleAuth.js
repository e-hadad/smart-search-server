import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config(); // חובה לפני שימוש ב process.env

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

export default oauth2Client;
