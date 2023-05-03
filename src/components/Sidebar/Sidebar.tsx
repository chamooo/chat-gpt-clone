import React from "react";
import "./index.scss";

interface SidebarProps {
    createNewChat: () => void;
    handleClickChat: (title: string) => void;
    uniqueTitles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({createNewChat, handleClickChat, uniqueTitles}) => {
    return (
        <nav className="sidebar">
            <h3>Історія</h3>
            <button onClick={createNewChat} className="new-chat-btn btn">нове базікало</button>
            <ul className="history-list">
                {uniqueTitles?.map((title: string, index: number) => {
                    return (
                        <li key={index} onClick={() => handleClickChat(title)}>
                            <a href="#">{title}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}

export default Sidebar;