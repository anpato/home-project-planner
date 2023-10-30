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
      board: {
        Row: {
          admin_id: string | null
          archived: boolean | null
          created_at: string
          id: string
          name: string
          shareable_link: string | null
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          archived?: boolean | null
          created_at?: string
          id?: string
          name: string
          shareable_link?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          archived?: boolean | null
          created_at?: string
          id?: string
          name?: string
          shareable_link?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      board_roles: {
        Row: {
          board_id: string | null
          created_at: string
          id: number
          role: Database["public"]["Enums"]["role_enum"] | null
          sharee_id: string | null
        }
        Insert: {
          board_id?: string | null
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["role_enum"] | null
          sharee_id?: string | null
        }
        Update: {
          board_id?: string | null
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["role_enum"] | null
          sharee_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "board_roles_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          }
        ]
      }
      board_share: {
        Row: {
          admin_id: string | null
          board_id: string | null
          created_at: string
          id: number
          sharee_id: string | null
        }
        Insert: {
          admin_id?: string | null
          board_id?: string | null
          created_at?: string
          id?: number
          sharee_id?: string | null
        }
        Update: {
          admin_id?: string | null
          board_id?: string | null
          created_at?: string
          id?: number
          sharee_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "board_share_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          }
        ]
      }
      ideas: {
        Row: {
          board_id: string | null
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          board_id?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          board_id?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ideas_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ROLE: "Admin" | "Editor" | "Viewer"
      role_enum: "ADMIN" | "EDITOR" | "NONE" | "VIEWER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
