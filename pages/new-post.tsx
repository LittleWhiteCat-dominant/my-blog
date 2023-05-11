import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import Post from '../interfaces/post';
import Author from '../interfaces/author';
import Head from 'next/head';
import Layout from '../components/layout';
import Button from '../components/button';
import Container from '../components/container';
import MarkdownEditor from '../components/markdown-editor';

const DocumentStrSource = ''.replace(/([\s\S]*)<!--dividing-->/, '').replace(/^\n*/g, '');
let count = 1;

export default function NewPost() {
  const { globalStore } = useStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(true);
  const [mdstr, setMdstr] = useState<string>(DocumentStrSource);
  const [hideToolbar, setHideToolbar] = useState(true);
  const [toolbarBottom, setToolbarBottom] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);
  const router = useRouter();
  const allPosts: Post[] = globalStore.allPosts

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    const id = uuidv4();
    const date = new Date().toISOString().substring(0, 10);
    
    const author: Author = {
      name
    }
    const newPost: Post = {
      id,
      // slug,
      title,
      date,
      // coverImage,
      author,
      // excerpt,
      // ogImage,
      content
    };
    const totalPost = [...allPosts, newPost];

    globalStore.setPosts(totalPost);

    router.push('/');
  };

  return (
    <Layout>
      <Head>
        <title>New Blog Post</title>
      </Head>
      <Container>
        <h1 className="mb-10 mt-10 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none">New Blog Post</h1>
        <form className="mb-10">
          <div className='mb-5'>
            <label>
              Author:
              <input className="ml-5 border border-transparent bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent focus:" type="text" required value={name} placeholder='Your Name'onChange={handleNameChange}/>
            </label>
          </div>
          <br />
          <label className='mb-20'>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br />
          <label className='mb-20'>
            Content:
            <br />
            <textarea value={content} onChange={handleContentChange} />
          </label>
        </form>
        <Button text='Save Post' callback={handleSubmit}/>
      </Container>
      <div>
        <MarkdownEditor
          visible={visible}
          height="500px"
          value={mdstr}
          enableScroll={enableScroll}
          hideToolbar={hideToolbar}
          toolbarBottom={toolbarBottom}
        />
        <div style={{ marginTop: 10, display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              count += 1;
              setMdstr(`String ${count}`);
            }}
          >
            Modify Markdown
          </button>
          <label>
            <input type="checkbox" checked={hideToolbar} onChange={(evn) => setHideToolbar(evn.target.checked)} />
            hideToolbar
          </label>
          <label>
            <input type="checkbox" checked={enableScroll} onChange={(evn) => setEnableScroll(evn.target.checked)} />
            enableScroll
          </label>
          <label>
            <input type="checkbox" checked={toolbarBottom} onChange={(evn) => setToolbarBottom(evn.target.checked)} />
            toolbarBottom
          </label>
          <button onClick={() => setVisible(!visible)}>{visible ? 'Show' : 'Hide'}</button>
        </div>
      </div>
    </Layout>
  );
}