import React from 'react';

type EmojiProps = {
  /** Aria-label for accessibility */
  label?: string;
  /** Emoji symbol to display e.g. 🚀 */
  symbol: string;
};

function Emoji(props: EmojiProps) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : undefined}
      aria-hidden={props.label ? undefined : true}
    >
      {props.symbol}
    </span>
  );
}

export default Emoji;
