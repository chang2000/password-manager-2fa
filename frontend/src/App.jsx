import { useState } from "react";

// import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        website: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        setEntries([...entries, formData]);
        setFormData({ website: '', username: '', email: '', password: '' }); // Clear the form
    };

  return (
    <>
      <div className="password-manager">
        <header className="header-bar">
          <h1 className="title">Password Manager</h1>
          <button className="logout-button">Logout</button>
        </header>
        <div className="password-form-container">
                <div className="form-header">Add Password</div>
                <form className="form-fields" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Website"
                        className="form-input"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="UserName"
                        className="form-input"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="form-input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="form-button">Add</button>
                </form>
            </div>
            <div className="password-list">
                <table>
                    <thead>
                        <tr>
                            <th>S.L</th>
                            <th>Website</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.website}</td>
                                <td>{entry.username}</td>
                                <td>{entry.email}</td>
                                <td>{'*'.repeat(entry.password.length)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </div>
      <div className="card">
        <button
          onClick={() => {
            fetch("/api/auth/test")
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                alert("Success: Check console for response");
              });
          }}
        >
          CLICK to test backend
        </button>
      </div>
    </>
  );
}

export default App;
