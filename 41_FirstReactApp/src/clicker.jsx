import { useRef, useState, useEffect } from "react";
export default function Clicker({ increment, keyName, color }) {
  const [count, setCount] = useState(+localStorage.getItem(keyName) ?? 0);
  useEffect(() => {
    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);
  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current.style.backgroundColor = "papayawhip";
    buttonRef.current.style.color = "salmon";
    buttonRef.current.style.padding = "5px";
    buttonRef.current.style.fontSize = "20px";
    console.log(buttonRef);
    localStorage.setItem(keyName, count);
  }, [count, buttonRef]);

  const buttonClick = () => {
    setCount((count) => count + 1);
    increment();
  };
  return (
    <div style={{ color: color }}>
      <h1>Click Count : {count}</h1>
      <button ref={buttonRef} onClick={buttonClick}>
        Click Me{" "}
      </button>
    </div>
  );
}
