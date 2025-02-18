import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { nanoid } from 'nanoid';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// Initialize Supabase connection
const initializeSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('Supabase initialized successfully');
    return data.session;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    throw error;
  }
};

// Initialize on import
initializeSupabase().catch(console.error);

interface UploadResponse {
  url: string;
  path: string;
}

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResponse> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl: url } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    return {
      url,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Authentication
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Blog posts
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createBlogPost(post: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogPost(id: string, post: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...post,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Programs
export async function getPrograms() {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProgram(slug: string) {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProject(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Sections
export async function getSections() {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateSection(id: string, section: any) {
  const { data, error } = await supabase
    .from('sections')
    .update({
      ...section,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Site config
export async function getSiteConfig() {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateSiteConfig(config: any) {
  const { data, error } = await supabase
    .from('site_config')
    .update({
      ...config,
      updated_at: new Date().toISOString()
    })
    .eq('id', config.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}