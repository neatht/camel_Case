import React, { useEffect, useRef, useState } from 'react';

import './TextInput.css';

type TextInputProps = {
  text?: string;
  padding?: string;
  radius?: string;
  editable?: boolean;
  multiline?: boolean;
  onChange: Function;
};

function TextInput(props: TextInputProps) {
  function handleChange(event: { target: { value: string } }) {
    setText(event.target.value);
  }
  const [text, setText] = useState(props.text);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const displayTextRef = useRef<any>(null);

  useEffect(() => {
    const input = inputRef.current;
    input?.classList.add('something');

    const displayText = displayTextRef.current;
    displayText?.classList.add('something');
  });

  const finish = () => {
    setEditing(false);
    props.onChange(text);
  };
  return (
    <div
      style={{ padding: props.padding, borderRadius: props.radius }}
      className={
        editing
          ? 'text-input text-input-focus'
          : props.editable
          ? 'text-input text-input-editable'
          : 'text-input'
      }
      onClick={() => {
        if (props.editable) {
          setEditing(true);
          if (inputRef.current !== null && displayTextRef.current !== null) {
            inputRef.current.focus();

            let width = displayTextRef.current.offsetWidth;
            if (width > 0) {
              inputRef.current.style.width = width + 'px';
            }

            let height = displayTextRef.current.offsetHeight;
            if (height > 0) {
              inputRef.current.style.height = height + 'px';
            }
          }
        }
      }}
    >
      <div
        ref={displayTextRef}
        className={editing ? 'text-input-display-none' : ''}
      >
        {text}
      </div>
      {props.multiline ? (
        <div className={editing ? '' : 'text-input-display-none'}>
          <textarea
            className="container-scroll"
            ref={inputRef}
            onBlur={() => finish()}
            value={text}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className={editing ? '' : 'text-input-display-none'}>
          <input
            ref={inputRef}
            onBlur={() => finish()}
            type="text"
            value={text}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default TextInput;
