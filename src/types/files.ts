export interface FileProps {
  id: number
  parent_id: number
  name: string
  type: 'file' | 'folder'
  size: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface FileNode extends FileProps {
  expanded?: boolean
  children?: FileNode[]
}
