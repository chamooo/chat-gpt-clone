import React from "react";

interface FormProps {
    isLoading: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setQuery: (query: string) => void;
    getMessage: () => void;
    query: string;
}
const Form: React.FC<FormProps> = ({isLoading, handleSubmit, setQuery, getMessage, query}) => {
    return (
        <form className="input-field" onSubmit={handleSubmit}>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="query-input"
                type="text"
                placeholder="Введіть повідомлення"

            />
            <button disabled={isLoading || query.length === 0} onClick={() => getMessage()} className="query-btn btn">
                {isLoading ? <div className="dot-elastic"></div> : "вжик ✨"}
            </button>
        </form>
    )
}

export default Form;