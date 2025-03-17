import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = {
      email: email,
      password: password
    };

    fetch("https://game.sitekickremastered.com/mod_panel_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(data)
    }).then(response => {
        console.info(response);
        if (!response.ok) throw new Error("");
        localStorage.setItem("user", JSON.stringify(response));  
    }).catch(error => {
        console.error("Error:", error);
    });
  }

  return (
    <div className={styles.loginContainer}>
      <img src="img/deadkick.png" alt="deadkick" />
      <form className={styles.loginForm}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
            <input className={styles.emailInput} onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email" placeholder="Email" required />
          </div>

          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
            <input className={styles.passInput} onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password" placeholder="Password" required />
          </div>
          <div className={styles.btnDiv}>
            <button className="button" onClick={handleLogin}>Login</button>
          </div>
      </form>
    </div>
  );
}
