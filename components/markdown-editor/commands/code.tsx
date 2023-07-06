import { EditorSelection } from '@codemirror/state';
import { ICommand } from '.';

export const code: ICommand = {
  name: 'code',
  keyCommand: 'code',
  button: { 'aria-label': 'Insert code' },
  icon: (
    <span title='Inline code'>
      <svg viewBox="0 0 24 24" width="15" height="15">
        <path
          stroke="currentColor"
          d="M16 3.383l-.924-.383-7.297 17.617.924.383 7.297-17.617zm.287 3.617l6.153 4.825-6.173 5.175.678.737 7.055-5.912-7.048-5.578-.665.753zm-8.478 0l-6.249 4.825 6.003 5.175-.679.737-6.884-5.912 7.144-5.578.665.753z"/>
      </svg>
    </span>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: '`' },
          { from: range.to, insert: '`' },
        ],
        range: EditorSelection.range(range.from + 1, range.to + 1),
      })),
    );
  },
};

export const codeBlock: ICommand = {
  name: 'codeBlock',
  keyCommand: 'codeBlock',
  button: { 'aria-label': 'Insert Code Block' },
  icon: (
    <span title='Code block'>
      <svg viewBox="0 0 1024 1024" fill="currentColor" width="20" height="20">
        <path d="M832 1024H192c-106.048 0-192-86.016-192-192V192a192 192 0 0 1 192-192h640c105.984 0 192 85.952 192 192v640c0 105.984-86.016 192-192 192z m64-832a64 64 0 0 0-64-64H192C156.672 128 128 156.672 128 192v640a64 64 0 0 0 64 64h640c35.392 0 64-28.608 64-64V192z m-128 384v64c0 105.984-86.016 192-192 192v-128c35.392 0 64-28.608 64-64v-64a64 64 0 1 0 0-128v-64a64 64 0 0 0-64-64V192c105.984 0 192 85.952 192 192v64a64 64 0 1 1 0 128z m-512 64v-64a64.021333 64.021333 0 0 1 0-128v-64a192 192 0 0 1 192-192v128c-35.328 0-64 28.672-64 64v64a64.021333 64.021333 0 0 0 0 128v64a64 64 0 0 0 64 64v128c-106.048 0-192-86.016-192-192z" />
      </svg>
    </span>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to);
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `\`\`\`js\n${txt}\n\`\`\``,
      },
      selection: EditorSelection.range(main.from + 3, main.from + 5),
    });
  },
};
