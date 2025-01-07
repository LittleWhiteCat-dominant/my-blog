import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        {/* <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-[2.5rem]">
            Developed with Next.js.
          </h3> */}
        {/* <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link
             href="/new-post"
             className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
             >
              Write Documentation
            </Link>
          </div> */}
        <div className="flex flex-row flex-wrap items-center justify-center py-8 sm:justify-between">
          <div className="flex space-x-2 text-sm text-black dark:text-gray-950">
            <div>@ 2025</div>
            <div>Ian Zhang</div>
            <a href="/">Ian's Blog</a>
          </div>
          <div className="flex space-x-2 pl-10 text-sm text-black sm:pl-0 dark:text-gray-950">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/LittleWhiteCat-dominant"
            >
              GitHub
            </a>
            <div>·</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jie-zhang-927218120/"
            >
              Linkedin
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer
