type Props = {
  text: string
  callback: Function
}

const Button = ({ text, callback }: Props) => {

  return (
    <button
      className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 transform motion-safe:hover:scale-110"
      onClick={() => callback}>
      { text }
    </button>
  )
}

export default Button
