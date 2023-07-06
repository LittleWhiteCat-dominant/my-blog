import React, { useRef, useState } from 'react';
import { EditorSelection } from '@codemirror/state';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { ICommand } from '.';
import { IMarkdownEditor, ToolBarProps } from '../';
import InputFile from './input-file';
import DropList from './drop-list';
import ImageList from './image-list';

export const image: ICommand = {
  name: 'image',
  keyCommand: 'image',
  button: (command, props, opts) => <Image command={command} editorProps={{ ...props, ...opts }} />,
  icon: (
    <span title='Image'>
      <svg fill="currentColor" viewBox="0 0 1024 1024" width="20" height="20">
        <path
          d="M904.036174 0H119.340522C53.670957 0 0 51.066435 0 116.758261v784.65113C0 967.190261 53.670957 1024 119.340522 1024h784.695652C969.728 1024 1024 967.190261 1024 901.409391V116.758261C1024 51.066435 969.728 0 904.036174 0z m-285.829565 163.59513a153.86713 153.86713 0 1 1 0 307.667479 153.86713 153.86713 0 0 1 0-307.667479z m269.668174 667.492174c-6.522435 12.087652-19.144348 14.825739-32.857044 14.825739H182.694957c-11.820522 0-22.950957-0.823652-30.007653-10.306782-7.056696-9.527652-9.193739-19.389217-5.765565-30.742261l96.189218-317.017043c6.344348-20.925217 24.019478-35.84 45.612521-39.424a57.700174 57.700174 0 0 1 56.008348 23.663304l134.477913 189.061565a57.299478 57.299478 0 0 0 78.937044 14.291478l123.814956-84.079304a57.344 57.344 0 0 1 80.250435 16.13913l124.126609 187.770435c7.479652 11.50887 8.102957 23.774609 1.536 35.817739z"/>
      </svg>
    </span>
  )
};

const Image: React.FC<{ command: ICommand; editorProps: IMarkdownEditor & ToolBarProps }> = (props) => {

  const inputFile: React.RefObject<HTMLInputElement> = useRef();

  const [state, setState] = useState(false);

  const { editor } = props.editorProps;

  const insertBase64Image = (editor: ReactCodeMirrorRef, name: string, image: string) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const main = view.state.selection.main;
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `![${name}](${image})`,
      },
      selection: EditorSelection.range(main.from + 4, main.to + 4),
    });
  }

  const insertEmptyTag = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to);
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `![](${txt})`,
      },
      selection: EditorSelection.range(main.from + 4, main.to + 4),
      // selection: { anchor: main.from + 4 },
    });
  }

  const hide = () => {
    setState(false);
  }
  const show = () => {
    setState(true);
  }

  const onImageChanged = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      if (editor && editor.current && reader.result) {
        insertBase64Image(editor.current!, file.name, reader.result.toString());
      }
    }
    reader.readAsDataURL(file);
  }
  return (
    <button
      className="header"
      onMouseEnter={show}
      onMouseLeave={hide}>
      {props.command.icon}
      <DropList show={state} onClose={hide}>
        <ImageList onSelectType={(type: string, file: File) => {
          switch (type) {
            case 'base64':
              onImageChanged(file);
              break;
            case 'url':
              if (editor && editor.current) {
                insertEmptyTag(editor.current!);
              }
              break;
            default:
              break;
          }
        }} />
      </DropList>
      <InputFile
        accept='image/*'
        ref={inputFile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.persist();
          if (e.target.files && e.target.files.length > 0) {
            onImageChanged(e.target.files[0]);
          }
        }}
      />
    </button>
  );
}