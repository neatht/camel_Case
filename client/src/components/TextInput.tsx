import React, { useEffect, useRef, useState } from 'react';

import './TextInput.css';

type TextInputProps = {
  // label?: string;
  // symbol: string;
  text: string;
};


function TextInput(props: TextInputProps) {
  function handleChange(event: { target: { value: string; }; }) {
    setText(event.target.value);
    // alert('A name was submitted: ' + event.target.value);
    // this.setState({value: event.target.value});
  }
  const [text, setText] = useState(props.text);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const node = inputRef.current;
  useEffect(() => {
    const node = inputRef.current
    node?.classList.add('something')
    // ^ note the new ? similar to `if (node)`
  })
  return (

      <div className={ editing ? 'text-input text-input-focus' : 'text-input'} onClick={() => {
        setEditing(true);
        if ( node !== null ) {
          node.focus();

          console.log(node);
        } else {
          console.log(";<");
        }
        }}>

        
        <div className={ editing ? 'text-input-display-none' : ''}>{text}</div>
        <div className={ editing ? '' : 'text-input-display-none'}>
        <input ref={inputRef} onBlur={() => setEditing(false)} type="text" value={text} onChange={handleChange} />

        </div>

        
        
        {/* <input type="text" value={text} onChange={handleChange} /> */}
      </div>
  );
}

export default TextInput;
