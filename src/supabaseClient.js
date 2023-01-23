import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xhegppvlqrotnpejsiyc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZWdwcHZscXJvdG5wZWpzaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NjMzMzMsImV4cCI6MTk4ODMzOTMzM30.WsabppnozNrpKem6xBUd9eq8bkC5cRFcc-rDGtJH-W8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
