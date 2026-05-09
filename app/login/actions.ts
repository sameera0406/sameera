'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server' 

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  // Change '/' to the path of your notes page
  redirect('/notes') 
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Point this to your actual confirm route
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`,
    },
  })

  if (error) {
    // If rate limit is hit, this will redirect to /error
    // For debugging, you can use: redirect(`/login?message=${error.message}`)
    return redirect('/error')
  }

  revalidatePath('/', 'layout')

  if (authData.user && authData.session) {
    return redirect('/notes')
  } else {
    // MATCH YOUR FOLDER: app/auth/sign-up-success
    return redirect('/auth/sign-up-success')
  }
}
