"use client";

import { useState, useEffect, useCallback } from "react";
import NoteEditor from "./components/NoteEditor";
import NoteCard from "./components/NoteCard";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const STORAGE_KEY = "notes-app-data";

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setMounted(true);
  }, []);

  const persist = useCallback((updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  function addNote(title: string, content: string) {
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    persist([note, ...notes]);
  }

  function deleteNote(id: string) {
    persist(notes.filter((n) => n.id !== id));
  }

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()),
  );

  if (!mounted) return null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Notes</h1>

      <section className="mb-8 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
        <NoteEditor onSave={addNote} />
      </section>

      {notes.length > 0 && (
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
        />
      )}

      {filtered.length === 0 && notes.length > 0 && (
        <p className="text-center text-sm text-gray-400">No matching notes.</p>
      )}

      {notes.length === 0 && (
        <p className="text-center text-sm text-gray-400">
          No notes yet. Create one above!
        </p>
      )}

      <div className="space-y-4">
        {filtered.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </main>
  );
}
