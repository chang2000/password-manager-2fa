import { useState } from "react";

// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="password-manager">
        <div className="header">Password Manager</div>
        <div className="password-form-container">
          <div className="form-header">Add Password</div>
          <div className="form-fields">
            <input type="text" placeholder="Website" className="form-input" />
            <input type="text" placeholder="UserName" className="form-input" />
            <input type="text" placeholder="Email" className="form-input" />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <button className="form-button">Add</button>
          </div>
        </div>
        <div className="password-list">
          <table>
            <thead>
              <tr>
                <th>S.L</th>
                <th>Website</th>
                <th>Note</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Repeat the row below for each password entry */}
              <tr>
                <td>1</td>
                <td>Facebook</td>
                <td>My Personal Account</td>
                <td>marifm1986@gmail.com</td>
                <td>********</td>
                <td>
                  <button>X</button>
                </td>
              </tr>
              {/* ... */}
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
