import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-5xl sm:text-4xl lg:text-6xl font-bold tracking-normal leading-tight sm:leading-10 mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}

export default PostTitle
