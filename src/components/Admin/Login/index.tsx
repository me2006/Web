import { useContext, useState } from "react";
import { GmContext } from "@site/src/pages/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function Login() {
  const { login } = useContext(GmContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <button type="button" className="button--flat" onClick={() => login(email, password)}>Login</button>
        </div>
      </form>
    </div>
  );
}
