import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileImage, Layout, BookOpen, Target, Users, Plus, Trash2, Edit, Eye, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import ContentForm from '../../components/admin/ContentForm';
import MediaUploader from '../../components/admin/MediaUploader';
import { supabase } from '../../lib/supabase';
import { defaultSections } from '../../lib/database.types';

interface ContentItem {
  id: string;
  title: string;
  content?: string;
  description?: string;
  image_url?: string;
  image_path?: string;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  slug: string;
  author?: string;
  author_photo?: string;
  author_bio?: string;
  created_at?: string;
}

interface SiteConfig {
  id: string;
  name: string;
  meta_title?: string;
  meta_description?: string;
  logo_url?: string;
  favicon_url?: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface Section {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  image_path?: string;
  sort_order: number;
}

export default function AdminPanel() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'projects' | 'programs' | 'site' | 'sections' | 'media'>('blog');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && isMounted) {
      fetchContent();
    }
  }, [isAuthenticated, activeTab, isMounted]);

  const fetchContent = async () => {
    if (!isMounted) return;

    try {
      let data;
      switch (activeTab) {
        case 'blog':
          const { data: blogPosts } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });
          setContent(blogPosts || []);
          break;
        case 'projects':
          const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
          setContent(projects || []);
          break;
        case 'programs':
          const { data: programs } = await supabase
            .from('programs')
            .select('*')
            .order('created_at', { ascending: false });
          setContent(programs || []);
          break;
        case 'sections':
          const { data: sections } = await supabase
            .from('sections')
            .select('*')
            .order('sort_order', { ascending: true });
          setSections(sections || []);
          break;
        case 'site':
          const { data: siteConfig } = await supabase
            .from('site_config')
            .select('*')
            .single();
          setSiteConfig(siteConfig);
          break;
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(email, password);
    if (!success) {
      setLoginError('Invalid credentials');
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsCreating(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleDelete = async (item: ContentItem) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const table = activeTab === 'blog' ? 'blog_posts' : activeTab;
      await supabase
        .from(table)
        .delete()
        .eq('id', item.id);

      if (item.image_path) {
        await supabase.storage
          .from('media')
          .remove([item.image_path]);
      }

      if (isMounted) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const table = activeTab === 'blog' ? 'blog_posts' : activeTab;
      
      if (isCreating) {
        await supabase
          .from(table)
          .insert([{
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
      } else if (editingItem) {
        await supabase
          .from(table)
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);
      }

      if (isMounted) {
        setIsCreating(false);
        setEditingItem(null);
        fetchContent();
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
        <div className="bg-white dark:bg-dark-lighter p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Access</h2>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-center">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white">
      <div className="flex h-screen">
        <div className="w-64 bg-white dark:bg-dark-lighter border-r border-gray-200 dark:border-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'blog' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <BookOpen size={20} />
                <span>Blog Posts</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'projects'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <Target size={20} />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'programs'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <Users size={20} />
                <span>Programs</span>
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'sections'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <Layout size={20} />
                <span>Page Sections</span>
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'media'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <FileImage size={20} />
                <span>Media Library</span>
              </button>
              <button
                onClick={() => setActiveTab('site')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'site'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
              >
                <Settings size={20} />
                <span>Site Settings</span>
              </button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            {activeTab !== 'site' && activeTab !== 'media' && (
              <button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create New</span>
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {(isCreating || editingItem) && activeTab !== 'site' && activeTab !== 'media' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg"
              >
                <ContentForm
                  type={activeTab === 'blog' ? 'blog' : activeTab === 'projects' ? 'project' : 'program'}
                  initialData={editingItem}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            ) : (
              <>
                {activeTab !== 'site' && activeTab !== 'media' && (
                  <motion.div
                    key="content-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-6"
                  >
                    {content.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                            >
                              <Edit size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'site' && siteConfig && (
                  <motion.div
                    key="site-config"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg"
                  >
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Name</label>
                        <input
                          type="text"
                          value={siteConfig.name}
                          onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                          className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Meta Title</label>
                          <input
                            type="text"
                            value={siteConfig.meta_title || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, meta_title: e.target.value })}
                            className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Meta Description</label>
                          <textarea
                            value={siteConfig.meta_description || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, meta_description: e.target.value })}
                            className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Logo</label>
                          <MediaUploader
                            onUploadComplete={(url) => setSiteConfig({ ...siteConfig, logo_url: url })}
                            folder="site"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Favicon</label>
                          <MediaUploader
                            onUploadComplete={(url) => setSiteConfig({ ...siteConfig, favicon_url: url })}
                            folder="site"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Section Visibility</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(defaultSections).map(([section, defaultValue]) => {
                            const [isVisible, setIsVisible] = useState(defaultValue);

                            useEffect(() => {
                              const fetchSectionVisibility = async () => {
                                const { data } = await supabase
                                  .from('site_config')
                                  .select('sections')
                                  .single();
                                if (data) {
                                  setIsVisible(data.sections[section]);
                                }
                              };
                              fetchSectionVisibility();
                            }, [section]);

                            const toggleSection = async () => {
                              const newValue = !isVisible;
                              setIsVisible(newValue);
                              
                              await supabase
                                .from('site_config')
                                .update({
                                  sections: {
                                    ...defaultSections,
                                    [section]: newValue
                                  }
                                })
                                .eq('id', siteConfig.id);
                            };

                            return (
                              <div key={section} className="flex items-center justify-between p-4 bg-light dark:bg-dark rounded-lg">
                                <span className="text-gray-900 dark:text-white capitalize">{section}</span>
                                <button
                                  type="button"
                                  onClick={toggleSection}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    isVisible ? 'bg-primary' : 'bg-gray-400'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      isVisible ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Social Links</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(siteConfig.social_links || {}).map(([platform, url]) => (
                            <div key={platform}>
                              <label className="block text-sm font-medium mb-2 capitalize">{platform}</label>
                              <input
                                type="url"
                                value={url || ''}
                                onChange={(e) => setSiteConfig({
                                  ...siteConfig,
                                  social_links: {
                                    ...siteConfig.social_links,
                                    [platform]: e.target.value
                                  }
                                })}
                                className="w-full p-2 rounded bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
                      >
                        Save Changes
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'media' && (
                  <motion.div
                    key="media-library"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <MediaUploader
                      onUploadComplete={(url) => {
                        console.log('Uploaded:', url);
                      }}
                      folder="media"
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Media items would go here */}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}