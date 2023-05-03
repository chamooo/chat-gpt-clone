import React from "react";
import { Message } from "../../App";

interface ChatProps {
    currentChat: Message[];
}

const Chat: React.FC<ChatProps> = ({currentChat}) => {
    return(
        <ul className="chat">
            {currentChat.map((chatMessage: Message, index: number) => {
                return (
                    <li className={`message-item ${chatMessage.role}`}  key={index}>
                        <div className="message-role">
                            <span>{chatMessage.role.slice(0, 1).toUpperCase()}</span>
                        </div>
                        <p className="message-text">{chatMessage.content}</p>
                    </li>
                );
            })}
        </ul>
    )
}

export default Chat;