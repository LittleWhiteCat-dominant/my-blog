import MarkdownPreview from '../markdown-preview';
import * as React from "react";
// import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {

  return (
    <div className="pt-10 pb-8">
      {/* <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <div id="wmde-markdown-var" className='md-editor wmde-markdown-var'>
        <MarkdownPreview source={content} showOutline={true}/>
      </div>
    </div>
  )
}

export default PostBody
