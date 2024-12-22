import { useState } from 'react';
import './crud2.css';

function Crud2() {
    const [name, setName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [oldName, setOldName] = useState('');
    const [newName, setNewName] = useState('');
    const [names, setNames] = useState([]);
    const [searchResult, setSearchResult] = useState('');

    const handleInsert = () => {
        if (name) {
            setNames([...names, name]);
            setName('');
        }
    };

    const handleSearch = () => {
        const exists = names.includes(searchName);
        setSearchResult(exists ? "This name exists" : "This name does not exist");
    };

    const handleModify = () => {
        const index = names.indexOf(oldName);
        if (index !== -1) {
            const updatedNames = [...names];
            updatedNames[index] = newName;
            setNames(updatedNames);
            setOldName('');
            setNewName('');
        }
    };

    const handleDelete = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    return (
        <div className="app">
            <h2>CRUD Application</h2>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleInsert}>Insert</button>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Search name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchResult && <p>{searchResult}</p>}

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Old name"
                    value={oldName}
                    onChange={(e) => setOldName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleModify}>Modify</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((n, index) => (
                        <tr key={index}>
                            <td>{n}</td>
                            <td>
                                <button onClick={() => handleDelete(index)} className="delete-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Crud2;
