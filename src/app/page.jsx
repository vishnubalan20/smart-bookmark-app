"use client";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Smart Bookmarks
        </h1>
        <p className="text-gray-500 mb-8">
          Save, organize, and access your links anytime
        </p>

        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 transition active:scale-[0.98]"
        >
          {/* Google Icon */}
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 6.4 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 6.4 28.9 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c4.8 0 9.3-1.8 12.6-4.9l-5.8-4.9c-2 1.5-4.5 2.3-6.8 2.3-5.3 0-9.7-3.6-11.3-8.4l-6.6 5.1C9.4 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-1.1 3-3.4 5.5-6.3 6.9l.1.1 5.8 4.9C33.7 38.4 44 32 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>

          <span>Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure login powered by Google
        </p>
      </div>
    </div>
  );
}
