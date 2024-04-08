import React from 'react';

const SearchPeople: React.FC = () => {
    return (
        <div className="search-people">
            <input placeholder="Search people..."/>
            <ul className="friends-list">
                <li>
                    <h1>Person 1</h1>
                    <button>Add to chat</button>
                </li>
                <li>
                    <h1>Person 2</h1>
                    <button>Add to chat</button>
                </li>
                <li>
                    <h1>Person 3</h1>
                    <button>Add to chat</button>
                </li>
                <li>
                    <h1>Person 4</h1>
                    <button>Add to chat</button>
                </li>
            </ul>
        </div>
    );
}

export default SearchPeople
