import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { uploadFile } from '../../lib/supabase';

interface MediaUploaderProps {
  onUploadComplete: (url: string, path: string) => void;
  folder?: string;
  accept?: string;
}

export default function MediaUploader({ onUploadComplete, folder = 'uploads', accept = 'image/*' }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const { url, path } = await uploadFile(file, folder);
      onUploadComplete(url, path);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-primary transition-colors">
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto mb-2" />
        ) : (
          <div className="h-40 flex items-center justify-center">
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <p className="text-gray-400">
                Drop file here or click to upload
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}