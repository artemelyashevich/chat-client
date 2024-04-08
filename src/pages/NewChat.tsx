import React from "react"
import SearchPeople from "../components/SearchPeople.tsx";

export const NewChat: React.FC = () => {
    return (
        <div className="new-chat">
            <SearchPeople />
            <button>Create Chat</button>
        </div>
    )
}

export default NewChat