import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type Note = {
  id: number
  title: string
}

export default async function NotesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function addNote(formData: FormData) {
    'use server'
    const title = formData.get('title')?.toString().trim()

    if (!title) return

    const supabase = await createClient()
    await supabase.from('notes').insert({ title })
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

  const { data: notes } = await supabase
    .from('notes')
    .select('id,title')
    .order('id', { ascending: false })

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

        <div className="grid gap-4">
          {notes?.map((note) => (
            <div
              key={note.id}
              className="group flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl mb-4 hover:bg-white/[0.07] transition-all"
            >
              <p className="text-lg text-gray-200">{note.title}</p>

              <form action={deleteNote}>
                <input type="hidden" name="id" value={note.id} />
                <button
                  type="submit"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-bold px-3 py-1 rounded-lg tracking-widest uppercase"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
