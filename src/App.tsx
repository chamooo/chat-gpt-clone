import React from 'react';
import './index.scss';

import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Form from "./components/Form/Form";

export interface Message {
    role: string;
    content: string;
}

interface Chat {
    title: string;
    role: string;
    content: string;
}

const App: React.FC = () => {
    const [query, setQuery] = React.useState<string>("");
    const [message, setMessage] = React.useState<Message>();
    const [chat, setChat] = React.useState<Chat[]>([]);
    const [currentTitle, setCurrentTitle] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const createNewChat = () => {
        setMessage(undefined);
        setQuery("");
        setCurrentTitle("");
    }

    const handleClickChat = (title: string) => {
        setCurrentTitle(title);
        setMessage(undefined);
        setQuery("");
    }

    const getMessage = async () => {
        if(!query) return;
        setIsLoading(true);
        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: query,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch('http://localhost:8000/completions', options);
            const data = await response.json();
            setMessage(data.choices[0].message);
        } catch (error) {
            console.log(error)
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (!currentTitle && query && message) {
            setCurrentTitle(query);
        }
        if (currentTitle && message && query) {
            setChat((prev) => {
                return [...prev,
                    {
                        title: currentTitle,
                        role: 'user',
                        content: query
                    },
                    {
                        title: currentTitle,
                        role: message.role,
                        content: message.content
                    }
                ];
            })
            setQuery("");
        }
    }, [message, currentTitle]);

    const handleSubmit = () => {
        getMessage().then(res => res);
    }

    const currentChat = chat.filter((item: Chat) => item.title === currentTitle);
    const uniqueTitles = Array.from(new Set(chat.map((item: Chat) => item.title)));

    return (
        <div className="App">
            <Sidebar
                createNewChat={createNewChat}
                handleClickChat={handleClickChat}
                uniqueTitles={uniqueTitles}
            />
            <div className="container">
                <h1>ґпт</h1>
                <Chat currentChat={currentChat}/>
                <Form
                    isLoading={isLoading}
                    getMessage={getMessage}
                    setQuery={setQuery}
                    handleSubmit={handleSubmit}
                    query={query}/>
            </div>
        </div>
    );
};

export default App;
