type Props = {
  name: string
}

const Tag = ({ name }: Props) => {
  return <div className="inline-block text-sm border px-1 py-2 border-gray-500 font-medium rounded border-current leading-3">{name}</div>
}

export default Tag;
