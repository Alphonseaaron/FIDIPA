import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
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
    const storageRef = ref(storage, path);
    
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
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
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}