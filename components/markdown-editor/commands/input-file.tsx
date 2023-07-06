// TableList
import React, { useRef, useEffect, useImperativeHandle } from 'react';

interface InputFileProps {
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = React.forwardRef((props: InputFileProps, ref) => {
  let timerId: number = undefined;

  let locked: boolean = false;

  let input: React.RefObject<HTMLInputElement> = useRef();

  useEffect(() => {
    function clear() {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    }
    return function () {
      clear();
    }
  });

  useImperativeHandle(ref, () => ({
    click: () => {
      click();
    }
  }));

  const click = () => {
    if (locked || !input.current) {
      return;
    }
    locked = true;
    input.current.value = '';
    input.current.click();
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      locked = false;
      window.clearTimeout(timerId);
      timerId = undefined;
    }, 200);
  }

  return (
    <input
      type="file"
      ref={input}
      accept={props.accept}
      style={{
        position: 'absolute',
        zIndex: -1,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0,
      }}
      onChange={props.onChange}
    />
  );
})
export default InputFile;