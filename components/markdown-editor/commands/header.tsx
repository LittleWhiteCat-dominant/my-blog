import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { ICommand } from '.';
import React, { useState } from 'react';
import { IMarkdownEditor, ToolBarProps } from '../';
import DropList from './drop-list';
import HeaderList from './header-list';

export const header: ICommand = {
  name: 'header',
  keyCommand: 'header',
  button: (command, props, opts) => <Header command={command} editorProps={{ ...props, ...opts }} />,
  icon: (
    <svg fill="currentColor" viewBox="0 0 512 550" height="13" width="13">
      <path d="M448 448c0 17.69-14.33 32-32 32h-96c-17.67 0-32-14.31-32-32s14.33-32 32-32h16V272H112v144h16c17.67 0 32 14.31 32 32s-14.33 32-32 32H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h16V96H32C14.33 96 0 81.69 0 64s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v112h224V96h-16c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v320h16c17.7 0 32 14.3 32 32z" />
    </svg>
  )
};

const Header: React.FC<{ command: ICommand; editorProps: IMarkdownEditor & ToolBarProps }> = (props) => {
  const [state, setState] = useState(false);

  const { editor } = props.editorProps;

  const execute = (editor: ReactCodeMirrorRef, mark: string) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    // const matchMark = lineInfo.text.match(/^#+/);
    // if (matchMark && matchMark[0]) {
    //   const txt = matchMark[0];
    //   if (txt.length < 6) {
    //     mark = txt + '#';
    //   }
    // }
    if (mark.length > 6) {
      mark = '#######';
    }

    const title = lineInfo.text.replace(/^#+/, '');
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${mark} ${title}`,
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: lineInfo.from + mark.length + 1 },
    });
  }

  function handleClick(mark: string) {
    if (editor && editor.current) {
      execute(editor.current!, mark);
    }
  }

  const hide = () => {
    setState(false);
  }
  const show = () => {
    setState(true);
  }

  return (
    <button
      className="header"
      onMouseEnter={show}
      onMouseLeave={hide}
      >
      {props.command.icon}
      <DropList show={state} onClose={hide}>
        <HeaderList onSelectHeader={(header: string) => {
          switch (header) {
            case 'h1':
              handleClick('#')
              break;
            case 'h2':
              handleClick('##')
              break;
            case 'h3':
              handleClick('###')
              break;
            case 'h4':
              handleClick('####')
              break;
            case 'h5':
              handleClick('#####')
              break;
            case 'h6':
              handleClick('######')
              break;
            default:
              break;
          }
        }} />
      </DropList>
    </button>
  );
};
