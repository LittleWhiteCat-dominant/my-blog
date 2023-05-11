import MarkdownPreview from './markdown-preview';
// import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {

  return (
    <div>
      {/* <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <div className='md-editor wmde-markdown-var'>
        <MarkdownPreview source={content} />
      </div>
    </div>
  )
}

export default PostBody
