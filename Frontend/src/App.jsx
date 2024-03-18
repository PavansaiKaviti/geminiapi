import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./App.css";
//function that need to return promise
const makeRequestApi = async (input) => {
  const res = await axios.post("http://localhost:3000/genarator", { input });
  return res.data;
};
const App = () => {
  const [input, setinput] = useState("");

  const mutation = useMutation({
    mutationFn: makeRequestApi,
    mutationKey: ["gemini-api"],
  });
  const onchange = (e) => {
    setinput(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    mutation.mutate(input);
  };

  return (
    <div className="App">
      <header>Gemini Ai</header>
      <p>ask to here from us </p>
      <form action="/generator" onSubmit={onsubmit}>
        <label for="promt">Gemini Ai: </label>
        <input
          id="promt"
          placeholder="enter here"
          onChange={onchange}
          value={input}
        ></input>
        <div className="aibutton">
          <button type="submit">submit</button>
        </div>
        <div className="answer">
          <p>{mutation.data}</p>
        </div>
      </form>
    </div>
  );
};

export default App;
