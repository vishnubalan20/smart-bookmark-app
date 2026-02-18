"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState(null);

  // Initialize Supabase client in browser only
  useEffect(() => {
    const { createClient } = require("@supabase/supabase-js");
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    setSupabase(supabaseClient);

    const init = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        window.location.href = "/";
        return;
      }
      setUser(data.session.user);
      setLoading(false);
    };

    init();
  }, []);

  // Fetch bookmarks once user & supabase exist
  useEffect(() => {
    if (!user || !supabase) return;

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setBookmarks(data || []);
    };

    fetchBookmarks();
  }, [user, supabase]);

  // Add bookmark
  const addBookmark = async () => {
    if (!title || !url || !user || !supabase) return;

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({ title, url, user_id: user.id })
      .select();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setBookmarks((prev) => [data[0], ...prev]);
    setTitle("");
    setUrl("");
  };

  // Delete bookmark
  const deleteBookmark = async (id) => {
    if (!supabase) return;

    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }

    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading)
    return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">🔖 My Bookmarks</h1>
          <p className="text-gray-500 mt-1">Save and manage your favorite links</p>
        </div>

        {/* Add Bookmark Card */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-6">
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 mb-3
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 mb-3
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={addBookmark}
            className="w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white py-2 rounded-lg font-semibold
              hover:from-blue-700 hover:to-indigo-700
              transition active:scale-[0.98]"
          >
            <span className="text-lg font-bold">＋</span>
            <span>Add Bookmark</span>
          </button>
        </div>

        {/* Bookmark List */}
        <ul className="space-y-3">
          {bookmarks.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              No bookmarks yet. Add your first one 🚀
            </div>
          )}
          {bookmarks.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <a
                href={b.url}
                target="_blank"
                className="font-medium text-blue-600 hover:underline truncate max-w-[70%]"
              >
                {b.title}
              </a>
              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
