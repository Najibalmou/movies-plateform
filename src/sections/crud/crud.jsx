import { useState } from 'react';
import './crud.css';

function Crud() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [entries, setEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleAddOrUpdate = () => {
        const newEntry = { name, age, email };
        if (editIndex !== null) {
            const updatedEntries = entries.slice();
            updatedEntries[editIndex] = newEntry;
            setEntries(updatedEntries);
            setEditIndex(null);
        } else {
            setEntries([...entries, newEntry]);
        }
        setName('');
        setAge('');
        setEmail('');
    };

    const handleEdit = (index) => {
        setName(entries[index].name);
        setAge(entries[index].age);
        setEmail(entries[index].email);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    const handleSearch = () => {
        const emailExists = entries.some((entry) => entry.email === searchEmail);
        setSearchResult(emailExists ? "This email exists" : "This email does not exist");
    };

    return (
        <div className="app">
            <h2>CRUD Application</h2>
            <div className="InpAndBtn">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleAddOrUpdate}>
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>

            <div className="search-container">
                <input
                    type="email"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

            </div>
            {searchResult && <p>{searchResult}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.age}</td>
                            <td>{entry.email}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Crud;
