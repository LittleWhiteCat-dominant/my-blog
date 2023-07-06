import Avatar from '../avatar'
import DateFormatter from '../date-formatter'
import CoverImage from '../cover-image'
import Tag from '../tag'
import Link from 'next/link'
import type Author from '../../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="block rounded-lg bg-transparent ease-in-out hover:scale-105 duration-500">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} width="96" height="52" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-semibold">
          <DateFormatter dateString={date} />
        </div>
        <Tag name="next.js" />
      </div>
      <h3 className="text-2xl md:text-xl font-bold mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed mb-4 text-gray-600 tracking-wider">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}

export default PostPreview
