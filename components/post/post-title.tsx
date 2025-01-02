import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-normal sm:text-4xl sm:leading-10 md:text-left lg:text-6xl">
      {children}
    </h1>
  );
}

export default PostTitle
