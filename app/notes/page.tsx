import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

// --- Server Actions ---
async function addNote(formData: FormData) {
  'use server'
  const title = formData.get('title') as string
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    await supabase.from('notes').insert({ 
      title: title, 
      user_id: user.id,
      user_email: user.email 
    })
  }

  revalidatePath('/notes')
}

async function deleteNote(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id) return

  const supabase = await createClient()
  await supabase.from('notes').delete().match({ id: Number(id) })
  revalidatePath('/notes')
}

// --- Data Component ---
async function NotesList() {
  const supabase = await createClient()
  
  // 1. Get the session explicitly
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    console.log("Auth Error or No User:", authError)
    redirect('/login')
  }

  // Debugging: This will show up in your VS Code terminal (not the browser)
  console.log("Fetching notes for User ID:", user.id)

  try {
    const response = await fetch("https://fastapi-notes-app-sjsp.onrender.com/notes", {
      method: "GET",
      headers: {
        // We use user.id here. Ensure your FastAPI code is looking for "user_id"
        "user_id": user.id, 
        "Content-Type": "application/json"
      },
      cache: 'no-store' 
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      return (
        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-500">
          <p className="font-bold">Backend Configuration Error</p>
          <p className="text-sm">The security guard returned: {data.detail || JSON.stringify(data)}</p>
          <p className="text-xs mt-2 opacity-50 text-white">Debugging ID sent: {user.id}</p>
        </div>
      );
    }

    if (data.length === 0) {
      return <div className="text-gray-500 italic text-center py-10">No notes found for your account.</div>
    }

    return (
      <div className="grid gap-4">
        {data.map((note: any) => (
          <div key={note.id} className="group flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl mb-4 hover:bg-white/[0.07] transition-all">
            <p className="text-lg text-gray-200">{note.title}</p>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={note.id} />
              <button type="submit" className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-bold px-3 py-1 rounded-lg tracking-widest uppercase">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    )
  } catch (error) {
    return <div className="text-red-400">Connection failed. Is the Render server awake?</div>
  }
}
// --- Main Page ---
export default function NotesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 relative">
      <div className="max-w-3xl mx-auto z-10 relative">
        <h1 className="text-4xl font-black mb-8 tracking-tight">
          NOTES<span className="text-blue-500">.</span>
        </h1>

        <form action={addNote} className="mb-12 flex items-center gap-2">
          <input
            name="title"
            placeholder="Enter a new technical note..."
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            required
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">
            Save
          </button>
        </form>

        <Suspense fallback={<div className="text-gray-500 italic">Verifying security and loading notes...</div>}>
          <NotesList />
        </Suspense>
      </div>
    </div>
  )
}
