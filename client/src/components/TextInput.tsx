import React, { useRef, useState } from 'react';

import './TextInput.css';

type TextInputProps = {
  /** Text inside the text field */
  text?: string;
  /** Text to show when there is no text */
  placeholder?: string;
  /** CSS padding in px for the tex */
  padding?: string;
  /** CSS radius  */
  radius?: string;
  /** Whether the TextInput can be changed or just diplayed */
  editable?: boolean;
  /** Whether the TextInput can have multiple lines */
  multiline?: boolean;
  /** Maximum length of the TextInput */
  maxLen?: number;
  /** Callback function when the text field changes */
  onChange: Function;
};

function TextInput(props: TextInputProps) {
  function handleChange(event: { target: { value: string } }) {
    if (props.maxLen) {
      if (event.target.value.length < props.maxLen) {
        setText(event.target.value);
      } else {
        setText(event.target.value.substr(0, props.maxLen));
      }
    } else {
      setText(event.target.value);
    }
  }
  const [text, setText] = useState(props.text);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const displayTextRef = useRef<any>(null);
  const placeholder = props.placeholder ? props.placeholder : '';

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
          setText(props.text);
          setEditing(true);
          if (inputRef.current !== null && displayTextRef.current !== null) {
            setTimeout(() => {
              if (inputRef.current !== null) inputRef.current.focus();
            }, 50);

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
        {props.text ? (
          props.text
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
      </div>
      {props.multiline ? (
        <div className={editing ? '' : 'text-input-display-none'}>
          <textarea
            className="container-scroll"
            ref={inputRef}
            onBlur={() => finish()}
            value={text}
            placeholder={placeholder}
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
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default TextInput;
