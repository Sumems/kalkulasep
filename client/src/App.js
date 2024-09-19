import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.on("result", (data) => {
      setResult(data);
    });

    return () => {
      socket.off("result");
    };
  }, []);

  const calculate = (e) => {
    e.preventDefault();
    socket.emit("calculate", { expression });
  };

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };

  return (
    <div className="App">
      <h1>KalkulAsep</h1>
      <form onSubmit={calculate}>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <button type="submit">=</button>
      </form>
      <div className="button-container">
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          "+",
          "-",
          "*",
          "/",
        ].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        <button onClick={() => setExpression("")}>Clear</button>
      </div>
      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;
