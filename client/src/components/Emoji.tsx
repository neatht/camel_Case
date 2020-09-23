import React from 'react';

type EmojiProps = {
    label?: string,
    symbol: string;
}

function Emoji(props: EmojiProps) {
    return (
        <span
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
            {props.symbol}
        </span>
    )
}; 

export default Emoji;