import { useState, createContext } from 'react';
import Login from '@site/src/components/Admin/Login';
import Panel from '@site/src/components/Admin/Panel';

import styles from "./index.module.css";

export const UserContext = createContext(null);

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  function login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    //security.fileuri.strict_origin_policy
    fetch("http://localhost:8080/mod_panel_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },

      body: "json=" + encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        alert("Incorrect username / password");
        throw new Error("Incorrect username / password");
      }
      return res.json()
    }).then(resData => {
      // console.info(resData);
      localStorage.setItem("userInfo", JSON.stringify(resData));
      setLoggedIn(true);
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  function logout() {
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
  }

  function getCurrentUser() {
    const userStr = localStorage.getItem("userInfo");
    return (userStr) ? JSON.parse(userStr) : null;
  }

  return (
    <main className={styles.mainContainer}>
      <UserContext.Provider value={{ login: login, logout: logout, getCurrentUser: getCurrentUser }}>
        { !loggedIn ? <Login /> : <Panel /> }
      </UserContext.Provider>
    </main>
  );
}