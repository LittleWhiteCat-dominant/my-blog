import React, { useEffect, useState } from 'react';
import { ICommand } from '.';
import { IMarkdownEditor, ToolBarProps } from '../';

const Preview: React.FC<{ command: ICommand; editorProps: IMarkdownEditor & ToolBarProps }> = (props) => {
  const { editorProps } = props;
  const { containerEditor, preview, previewWidth = '50%' } = editorProps;
  const [visible, setVisible] = useState(props.editorProps.visible);
  useEffect(() => setVisible(props.editorProps.visible), [props.editorProps.visible]);
  useEffect(() => {
    if (preview.current) {
      const $preview = preview.current;
      if (preview) {
        $preview.style.borderBottomRightRadius = '3px';
      }
      if ($preview && visible) {
        $preview.style.width = previewWidth;
        $preview.style.overflow = 'auto';
        if (previewWidth !== '100%') {
          $preview.style.borderLeft = '1px solid var(--color-border-muted)';
        }
        $preview.style.padding = '20px';
        if (containerEditor.current) {
          containerEditor.current.style.width = `calc(100% - ${previewWidth})`;
        }
      } else if ($preview) {
        $preview.style.width = '0%';
        $preview.style.overflow = 'hidden';
        $preview.style.borderLeft = '0px';
        $preview.style.padding = '0';
        if (containerEditor.current) {
          containerEditor.current.style.width = '100%';
        }
      }
    }
  }, [visible, containerEditor, preview, previewWidth]);

  return (
    <button onClick={() => setVisible(!visible)} type="button" className={visible ? 'active' : ''}>
      { visible? (
        <span title='Close preview'>
          <svg fill="currentColor"viewBox="0 0 1150 1024" width="20" height="20">
            <path d="M77.609536 10.211016C56.809993-6.188624 26.610656-2.388708 10.211016 18.410836s-12.599723 50.99888 8.19982 67.39852l1183.974008 927.979628c20.799543 16.39964 50.99888 12.599723 67.398521-8.19982s12.599723-50.99888-8.19982-67.39852l-210.395382-164.796382c79.198261-81.198217 132.797085-172.19622 159.796492-236.794802 6.599855-15.799653 6.599855-33.399267 0-49.19892-29.799346-71.398433-92.397972-175.39615-185.995916-262.194244C930.990802 137.608219 801.593643 64.009835 639.99719 64.009835c-136.397006 0-249.994512 52.598845-338.592567 121.59733L77.609536 10.211016z m368.591909 288.79366c50.99888-46.598977 119.197383-74.998354 193.795745-74.998354 158.99651 0 287.993678 128.997168 287.993678 287.993678 0 49.798907-12.599723 96.597879-34.799236 137.396984L815.993327 588.99831c16.799631-38.599153 21.199535-82.798182 9.599789-126.597221-22.199513-82.998178-95.597901-138.796953-177.19611-142.196878-11.599745-0.399991-18.399596 12.199732-14.799675 23.399486 4.199908 12.799719 6.599855 26.39942 6.599855 40.599109 0 20.399552-4.799895 39.599131-13.19971 56.598757l-180.596036-141.596891zM745.994863 779.794121c-32.79928 12.999715-68.598494 20.199557-105.997673 20.199557-158.99651 0-287.993678-128.997168-287.993677-287.993678 0-13.799697 0.999978-27.199403 2.799938-40.399113l-188.59586-148.596738c-45.598999 59.398696-78.198283 118.597396-97.197866 164.396391-6.599855 15.799653-6.599855 33.399267 0 49.19892 29.799346 71.398433 92.397972 175.39615 185.995917 262.194244 93.997936 87.598077 223.395096 161.196461 384.991548 161.196461 95.597901 0 179.796053-25.799434 252.394459-64.998573L745.994863 779.794121z" />
          </svg>
        </span>
        )
        :
        props.command.icon
      }
    </button>
  );
};

export const preview: ICommand = {
  name: 'preview',
  keyCommand: 'preview',
  button: (command, props, opts) => <Preview command={command} editorProps={{ ...props, ...opts }} />,
  icon: (
    <span title='Preview'>
      <svg fill="currentColor" viewBox="0 0 576 512" height="16" width="16">
        <path d="M279.6 160.4c2.8-.3 5.6-.4 8.4-.4 53 0 96 42.1 96 96 0 53-43 96-96 96-53.9 0-96-43-96-96 0-2.8.1-5.6.4-8.4 9.3 4.5 20.1 8.4 31.6 8.4 35.3 0 64-28.7 64-64 0-11.5-3.9-22.3-8.4-31.6zm201-47.8c46.8 43.4 78.1 94.5 92.9 131.1 3.3 7.9 3.3 16.7 0 24.6-14.8 35.7-46.1 86.8-92.9 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.58-80.6C48.62 355.1 17.34 304 2.461 268.3a31.967 31.967 0 0 1 0-24.6C17.34 207.1 48.62 156 95.42 112.6 142.5 68.84 207.2 32 288 32c80.8 0 145.5 36.84 192.6 80.6zM288 112c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z" />
      </svg>
    </span>
  ),
};
