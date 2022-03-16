import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./app.css";

function App() {
  const [value, setValue] = useState("");
  const [user, setUser] = useState();
  const [logged, setLogged] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [message, setMessage] = useState("");
  const [x, setX] = useState("");

  useEffect(() => {
    if (value.length === 8) {
      setLogged(true);
      axios
        .post("https://jsonplaceholder.typicode.com/todos/1", value)
        .then((jwt) => localStorage.setItem("token", jwt))
        .catch((err) => console.log(err));

      setX(Math.round((Math.random() + 1) * 1000));
    }
  }, [value]);
  console.log(x);

  useEffect(() => {
    if (value1 && value2 && value3 && value4) {
      const a = `${value1}${value2}${value3}${value4}`;

      if (a == x) {
        setMessage("You are logged in");
      } else {
        setMessage("Wrong digits");
      }
    }
  }, [value1, value2, value3, value4]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return (
    <div>
      {!logged ? (
        <div>
          374 <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      ) : (
        <div>
          <input
            className="password"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
          <input
            className="password"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
          <input
            className="password"
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
          />
          <input
            className="password"
            value={value4}
            onChange={(e) => setValue4(e.target.value)}
          />
          {message && <h1>{message}</h1>}
        </div>
      )}{" "}
    </div>
  );
}

export default App;
