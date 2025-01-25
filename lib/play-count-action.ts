"use server";

import { supabase } from "@/utils/supabase";

export async function addPlayCount(id: number) {
  try {
    console.log("Call to increment");
    const { data: episode, error: fetchEpisodeError } = await supabase
      .from("episodes")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchEpisodeError) {
      throw new Error(fetchEpisodeError.message);
    }

    const playCount = episode.plays + 1;

    const { error: updateEpisodeError } = await supabase
      .from("episodes")
      .update({ plays: playCount })
      .eq("id", id);

    if (updateEpisodeError) {
      throw new Error(updateEpisodeError.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to increment play count");
  }
}
