"use client";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="group rounded-lg border border-gray-200 p-4 transition hover:shadow-md dark:border-gray-700">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold">{note.title}</h3>
        <button
          onClick={() => onDelete(note.id)}
          className="shrink-0 rounded px-2 py-1 text-xs text-red-500 opacity-0 transition hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </div>
      {note.content && (
        <p className="mb-3 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">
          {note.content}
        </p>
      )}
      <time className="text-xs text-gray-400">
        {new Date(note.createdAt).toLocaleString()}
      </time>
    </div>
  );
}
