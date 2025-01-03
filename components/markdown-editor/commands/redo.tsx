import { redo as redoHandle } from '@codemirror/commands';
import { ICommand } from '.';

export const redo: ICommand = {
  name: 'redo',
  keyCommand: 'redo',
  button: { 'aria-label': 'redo text' },
  icon: (
    <span title='Redo'>
      <svg viewBox="0 0 1024 1024" height="14" width="14">
        <path
          fill="currentColor"
          d="M946.8 420L651.9 125.1c-19.5-19.5-52.7-5.7-52.7 21.8v174c-79.3-1.8-501.8 14.9-532.3 569.6-0.9 17.2 22.1 24.3 30.6 9.3C255 621 396.6 553.3 599.1 561.5v175.2c0 27.5 33.3 41.3 52.8 21.9l294.8-294.9c12.1-12.1 12.1-31.6 0.1-43.7z"
        />
      </svg>
    </span>

  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    redoHandle(view);
  },
};
