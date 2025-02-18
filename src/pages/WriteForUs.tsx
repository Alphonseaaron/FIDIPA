import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../lib/supabase';
import BackButton from '../components/BackButton';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function WriteForUs() {
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [authorPhoto, setAuthorPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    if (!content) {
      alert('Please add some content to your article');
      return;
    }

    if (!coverImage) {
      alert('Please add a cover image for your article');
      return;
    }

    if (!authorPhoto) {
      alert('Please add your photo');
      return;
    }

    setSubmitting(true);
    try {
      // Upload images to Supabase Storage
      const coverImageExt = coverImage.name.split('.').pop();
      const authorPhotoExt = authorPhoto.name.split('.').pop();
      const coverImagePath = `blog/${Date.now()}-cover.${coverImageExt}`;
      const authorPhotoPath = `authors/${Date.now()}-photo.${authorPhotoExt}`;

      const [coverImageUpload, authorPhotoUpload] = await Promise.all([
        supabase.storage.from('media').upload(coverImagePath, coverImage),
        supabase.storage.from('media').upload(authorPhotoPath, authorPhoto)
      ]);

      if (coverImageUpload.error) throw coverImageUpload.error;
      if (authorPhotoUpload.error) throw authorPhotoUpload.error;

      const { data: { publicUrl: coverImageUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(coverImagePath);

      const { data: { publicUrl: authorPhotoUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(authorPhotoPath);

      // Save to Supabase
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: data.title,
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          content,
          image_url: coverImageUrl,
          image_path: coverImagePath,
          author: data.fullName,
          author_photo: authorPhotoUrl,
          author_bio: data.bio,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setSubmitSuccess(true);
      reset();
      setContent('');
      setCoverImage(null);
      setAuthorPhoto(null);
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Failed to submit article. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-dark">
        <div className="bg-dark-lighter p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-300">
            Your article has been submitted successfully and is pending review.
            We'll notify you once it's approved.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded transition-colors"
          >
            Submit Another Article
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-dark">
      <BackButton />
      <div className="max-w-3xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Write for Us
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                {...register('fullName')}
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
              />
              {errors.fullName && (
                <p className="mt-1 text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Article Title</label>
            <input
              {...register('title')}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
            {errors.title && (
              <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Bio</label>
            <textarea
              {...register('bio')}
              rows={3}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
            {errors.bio && (
              <p className="mt-1 text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAuthorPhoto(e.target.files?.[0] || null)}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
            <p className="mt-1 text-sm text-gray-400">
              This photo will appear alongside your articles
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
            <p className="mt-1 text-sm text-gray-400">
              This image will be displayed as the article's cover image
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <div className="bg-dark border border-gray-600 rounded">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Article'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}