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
      posts: {
        Row: {
          id: string
          title: string
          subject: string
          description: string
          author: string
          author_type: 'student' | 'teacher'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subject: string
          description: string
          author: string
          author_type: 'student' | 'teacher'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subject?: string
          description?: string
          author?: string
          author_type?: 'student' | 'teacher'
          created_at?: string
          updated_at?: string
        }
      }
      replies: {
        Row: {
          id: string
          content: string
          author: string
          author_type: 'student' | 'teacher'
          post_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author: string
          author_type: 'student' | 'teacher'
          post_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author?: string
          author_type?: 'student' | 'teacher'
          post_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}