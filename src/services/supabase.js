import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zbsgbyvkdxdqwihcabsp.supabase.co";
export const supabaseStorage = `${supabaseUrl}/storage/v1/object/public`;
export const supabaseStorageCabinImages = `${supabaseStorage}/cabin-images/ff`;
export const supabaseStorageAvatars = `${supabaseStorage}/avatars`;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpic2dieXZrZHhkcXdpaGNhYnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMzEzODAsImV4cCI6MjAxOTYwNzM4MH0.ZO0oGGI7lPsZEMvKCcBPTxny8FP-cjjySLH4-f1WjUA";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
