import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation' // <--- ADD THIS LINE

export default async function NotesPage() {
  const cookieStore = await cookies()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login') // Make sure to import { redirect } from 'next/navigation'
  }
  // 1. Action to Add a Note
  async function addNote(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const supabase = await createClient()
    await supabase.from('notes').insert({ title }).select()
    revalidatePath('/notes')
  }

  // 2. Action to Delete a Note
  async function deleteNote(formData: FormData) {
    'use server'
    const id = formData.get('id')
    const supabase = await createClient()
    await supabase.from('notes').delete().match({ id })
    revalidatePath('/notes')
  }

  const { data: notes } = await supabase.from('notes').select().order('id', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 relative">
      <div className="max-w-3xl mx-auto z-10 relative">
        
        {/* Header and Add Form remain the same as your current sleek design */}
        <h1 className="text-4xl font-black mb-8 tracking-tight">NOTES<span className="text-blue-500">.</span></h1>

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

        {/* Updated Notes List with working Delete */}
        <div className="grid gap-4">
          {notes?.map((note) => (
  <div key={note.id} className="group flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl mb-4 hover:bg-white/[0.07] transition-all">
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
