import React from 'react';

import './Emoji.css';

type EmojiProps = {
  /** Aria-label for accessibility */
  label?: string;
  /** Emoji symbol to display e.g. 🚀 */
  symbol: string;
  resize?: boolean;
};

function Emoji(props: EmojiProps) {
  return (
    <span
      className={props.resize === false ? 'emoji-no-resize' : 'emoji'}
      role="img"
      aria-label={props.label ? props.label : undefined}
      aria-hidden={props.label ? undefined : true}
    >
      {props.symbol}
    </span>
  );
}

export default Emoji;
