import type Author from './author'

type PostType = {
  id?: string
  slug?: string
  title: string
  date: string
  coverImage?: string
  author: Author
  tags: string[]
  excerpt?: string
  ogImage?: {
    url: string
  }
  content: string
}

export default PostType
