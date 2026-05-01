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
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful");
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

export default Signup;