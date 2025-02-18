export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          image_url: string | null
          author: string | null
          author_photo: string | null
          author_bio: string | null
          status: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          image_url?: string | null
          author?: string | null
          author_photo?: string | null
          author_bio?: string | null
          status?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          image_url?: string | null
          author?: string | null
          author_photo?: string | null
          author_bio?: string | null
          status?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string | null
          image_url: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string | null
          image_url: string | null
          status: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          status?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          status?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          title: string
          content: string | null
          image_url: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          image_url?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          image_url?: string | null
          sort_order?: number | null
          updated_at?: string
        }
      }
      site_config: {
        Row: {
          id: string
          name: string
          meta_title: string | null
          meta_description: string | null
          logo_url: string | null
          favicon_url: string | null
          social_links: Json
          sections: Json
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          meta_title?: string | null
          meta_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          social_links?: Json
          sections?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          meta_title?: string | null
          meta_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          social_links?: Json
          sections?: Json
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          photo_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          photo_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          photo_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      board_members: {
        Row: {
          id: string
          name: string
          role: string
          photo_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          photo_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          photo_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export const defaultSections = {
  home: true,
  about: true,
  programs: true,
  projects: true,
  team: true,
  blog: true,
  contact: true
} as const;