import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://fullstack-task-manager-backend.onrender.com/api/auth/signup", form);
      alert("Signup successful");
      window.location.href = "/login";
    } catch (error) {
      alert("Error");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h1>Signup</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  </div>
);
}

export default Signup;