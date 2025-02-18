import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Editor from './Editor';
import MediaUploader from './MediaUploader';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  order: z.number().min(0, 'Order must be a positive number'),
});

type FormData = z.infer<typeof schema>;

interface Section {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  image_path?: string;
  order: number;
}

interface SectionEditorProps {
  section?: Section;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function SectionEditor({ section, onSubmit, onCancel }: SectionEditorProps) {
  const [content, setContent] = useState(section?.content || '');
  const [imageUrl, setImageUrl] = useState(section?.image_url || '');
  const [imagePath, setImagePath] = useState(section?.image_path || '');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: section?.title || '',
      order: section?.order || 0,
    }
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
        <label className="block text-sm font-medium mb-2">Order</label>
        <input
          type="number"
          {...register('order', { valueAsNumber: true })}
          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
        />
        {errors.order && (
          <p className="mt-1 text-red-500 text-sm">{errors.order.message}</p>
        )}
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
        <label className="block text-sm font-medium mb-2">Section Image</label>
        <MediaUploader
          onUploadComplete={(url, path) => {
            setImageUrl(url);
            setImagePath(path);
          }}
          folder="sections"
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 max-h-40" />
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded border border-gray-600 hover:border-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}