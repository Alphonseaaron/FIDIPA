import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Editor from './Editor';
import MediaUploader from './MediaUploader';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ContentFormProps {
  type: 'blog' | 'project' | 'program';
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function ContentForm({ type, initialData, onSubmit }: ContentFormProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [imagePath, setImagePath] = useState(initialData?.image_path || '');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const handleFormSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await onSubmit({
        ...data,
        content,
        image_url: imageUrl,
        image_path: imagePath
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (url: string, path: string) => {
    setImageUrl(url);
    setImagePath(path);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          {...register('title')}
          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
        />
        {errors.title && (
          <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug</label>
        <input
          {...register('slug')}
          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
        />
        {errors.slug && (
          <p className="mt-1 text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <Editor
          value={content}
          onChange={setContent}
          placeholder="Write your content here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Featured Image</label>
        <MediaUploader
          onUploadComplete={handleImageUpload}
          folder={`${type}s`}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 max-h-40" />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Meta Title</label>
          <input
            {...register('meta_title')}
            className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Meta Description</label>
          <textarea
            {...register('meta_description')}
            rows={2}
            className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors disabled:opacity-50"
      >
        {submitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}