import { EditorSelection } from '@codemirror/state';
import { ICommand } from '.';

export const linebreak: ICommand = {
  name: 'linebreak',
  keyCommand: 'linebreak',
  button: { 'aria-label': 'Add image text' },
  icon: (
    <span title='Image'>
      <svg fill="currentColor" viewBox="0 0 900 900" width="20" height="20">
        <path d="M640 768h64a106.666667 106.666667 0 1 0 0-213.333333H170.666667a42.666667 42.666667 0 0 1 0-85.333334h533.333333a192 192 0 1 1 0 384H640v42.666667a21.333333 21.333333 0 0 1-34.133333 17.066667l-91.008-68.266667a42.666667 42.666667 0 0 1 0-68.266667l91.008-68.266666a21.333333 21.333333 0 0 1 34.133333 17.066666v42.666667zM170.666667 170.666667h682.666666a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 1 1 0-85.333333z m213.333333 640a42.666667 42.666667 0 0 1-42.666667 42.666666H170.666667a42.666667 42.666667 0 0 1 0-85.333333h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667z"/>
      </svg>
    </span>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${lineInfo.text}\n---`,
      },
      selection: { anchor: lineInfo.from + 3 },
    });
  },
};
