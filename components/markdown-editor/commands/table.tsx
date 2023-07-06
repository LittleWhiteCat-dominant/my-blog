import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorSelection } from '@codemirror/state';
import { ICommand } from '.';
import React, { useState } from 'react';
import { IMarkdownEditor, ToolBarProps } from '../';
import DropList from './drop-list';
import TableList from './table-list';

export const table: ICommand = {
  name: 'table',
  keyCommand: 'table',
  button: (command, props, opts) => <Table command={command} editorProps={{ ...props, ...opts }} />,
  icon: (
    <svg fill="currentColor" viewBox="0 0 980 900" width="30" height="30">
      <path d="M329.142857 786.285714v-109.714285q0-8-5.142857-13.142858t-13.142857-5.142857H128q-8 0-13.142857 5.142857t-5.142857 13.142858v109.714285q0 8 5.142857 13.142857t13.142857 5.142858h182.857143q8 0 13.142857-5.142858t5.142857-13.142857z m0-219.428571V457.142857q0-8-5.142857-13.142857t-13.142857-5.142857H128q-8 0-13.142857 5.142857t-5.142857 13.142857v109.714286q0 8 5.142857 13.142857t13.142857 5.142857h182.857143q8 0 13.142857-5.142857t5.142857-13.142857z m292.571429 219.428571v-109.714285q0-8-5.142857-13.142858t-13.142858-5.142857H420.571429q-8 0-13.142858 5.142857t-5.142857 13.142858v109.714285q0 8 5.142857 13.142857t13.142858 5.142858h182.857142q8 0 13.142858-5.142858t5.142857-13.142857zM329.142857 347.428571V237.714286q0-8-5.142857-13.142857t-13.142857-5.142858H128q-8 0-13.142857 5.142858t-5.142857 13.142857v109.714285q0 8 5.142857 13.142858t13.142857 5.142857h182.857143q8 0 13.142857-5.142857t5.142857-13.142858z m292.571429 219.428572V457.142857q0-8-5.142857-13.142857t-13.142858-5.142857H420.571429q-8 0-13.142858 5.142857t-5.142857 13.142857v109.714286q0 8 5.142857 13.142857t13.142858 5.142857h182.857142q8 0 13.142858-5.142857t5.142857-13.142857z m292.571428 219.428571v-109.714285q0-8-5.142857-13.142858t-13.142857-5.142857h-182.857143q-8 0-13.142857 5.142857t-5.142857 13.142858v109.714285q0 8 5.142857 13.142857t13.142857 5.142858h182.857143q8 0 13.142857-5.142858t5.142857-13.142857z m-292.571428-438.857143V237.714286q0-8-5.142857-13.142857t-13.142858-5.142858H420.571429q-8 0-13.142858 5.142858t-5.142857 13.142857v109.714285q0 8 5.142857 13.142858t13.142858 5.142857h182.857142q8 0 13.142858-5.142857t5.142857-13.142858z m292.571428 219.428572V457.142857q0-8-5.142857-13.142857t-13.142857-5.142857h-182.857143q-8 0-13.142857 5.142857t-5.142857 13.142857v109.714286q0 8 5.142857 13.142857t13.142857 5.142857h182.857143q8 0 13.142857-5.142857t5.142857-13.142857z m0-219.428572V237.714286q0-8-5.142857-13.142857t-13.142857-5.142858h-182.857143q-8 0-13.142857 5.142858t-5.142857 13.142857v109.714285q0 8 5.142857 13.142858t13.142857 5.142857h182.857143q8 0 13.142857-5.142857t5.142857-13.142858z m73.142857-182.857142v621.714285q0 37.714286-26.857142 64.571429t-64.571429 26.857143H128q-37.714286 0-64.571429-26.857143t-26.857142-64.571429V164.571429q0-37.714286 26.857142-64.571429t64.571429-26.857143h768q37.714286 0 64.571429 26.857143t26.857142 64.571429z" />
    </svg>
  )
};

const Table: React.FC<{ command: ICommand; editorProps: IMarkdownEditor & ToolBarProps }> = (props) => {
  const [state, setState] = useState(false);

  const defaultConfig = {
    maxRow: 6,
    maxCol: 6,
  };

  const { editor } = props.editorProps;

  const execute = (editor: ReactCodeMirrorRef, option: any) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    const main = view.state.selection.main;

    const txt = lineInfo.text.length === 0? '' : `${lineInfo.text}\n`

    const table = decorateTableText(option)
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${txt}${table}`,
      },
      selection: EditorSelection.range(main.from + 5, main.from + 5),
    });
  }

  const decorateTableText = (option: any) => {
    const { row = 2, col = 2 } = option;
    const rowHeader = ['|'];
    const rowData = ['|'];
    const rowDivision = ['|'];
    let colStr = '';
    for (let i = 1; i <= col; i++) {
      rowHeader.push(' Head |');
      rowDivision.push(' --- |');
      rowData.push(' Data |');
    }
    for (let j = 1; j <= row; j++) {
      colStr += '\n' + rowData.join('');
    }
    return `${rowHeader.join('')}\n${rowDivision.join('')}${colStr}`;
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
        <TableList
            visibility={state}
            maxRow={defaultConfig.maxRow}
            maxCol={defaultConfig.maxCol}
            onSetTable={(option: any) => {
              console.log('option:' + JSON.stringify(option))
              if (editor && editor.current) {
                execute(editor.current!, option);
              }
            }}
          />
      </DropList>
    </button>
  );
};