"use server";

import { supabase } from "@/utils/supabase";

interface LikeResult {
  liked: boolean;
  likeCount: number;
}

export async function toggleMixLike(
  mixId: number,
  clientId: string
): Promise<LikeResult> {
  try {
    // Check if client has already liked the mix
    const { data: existingLike, error: likeError } = await supabase
      .from("episode_likes")
      .select("*")
      .eq("episode_id", mixId)
      .eq("client_id", clientId)
      .single();

    if (likeError && likeError.code !== "PGRST116") {
      throw likeError;
    }

    let liked: boolean;
    if (existingLike) {
      // Unlike: Remove the like
      const { error: unlikeError } = await supabase
        .from("episode_likes")
        .delete()
        .eq("episode_id", mixId)
        .eq("client_id", clientId);

      if (unlikeError) throw unlikeError;
      liked = false;
    } else {
      // Like: Insert a new like
      const { error: likeError } = await supabase.from("episode_likes").insert({
        episode_id: mixId,
        client_id: clientId,
        liked_at: new Date().toISOString(),
      });

      if (likeError) throw likeError;
      liked = true;
    }

    // Get updated like count
    const { count: likeCount, error: countError } = await supabase
      .from("episode_likes")
      .select("*", { count: "exact" })
      .eq("episode_id", mixId);

    if (countError) throw countError;

    return {
      liked,
      likeCount: likeCount || 0,
    };
  } catch (error) {
    console.error("Error in toggleMixLike:", error);
    throw error;
  }
}
