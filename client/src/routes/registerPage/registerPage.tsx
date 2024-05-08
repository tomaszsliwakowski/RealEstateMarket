import { Link } from "react-router-dom";
import "./registerPage.scss";
import axios, { AxiosError } from "axios";
import { registerUrl } from "../../utils/apiRoutes";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return;
    try {
      const res = await axios.post(registerUrl, { username, email, password });
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
