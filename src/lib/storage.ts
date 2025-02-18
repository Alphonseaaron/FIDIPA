import { supabase } from './supabase';
import { nanoid } from 'nanoid';

interface UploadResponse {
  url: string;
  path: string;
}

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResponse> {
  try {
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${nanoid()}.${fileExtension}`;
    const path = `${folder}/${uniqueFilename}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(path, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl: url } } = supabase.storage
      .from('media')
      .getPublicUrl(path);
    
    return {
      url,
      path
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