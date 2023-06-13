import { Children, useMemo, useState } from "react";
import Clicker from "./clicker";
import People from "./people";
export default function App({ clickersCount, children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);
  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg,100%,70%)`);
    }
    return colors;
  }, [clickersCount]);

  const increment = () => {
    setCount(count + 1);
  };

  const tempArray = [...Array(clickersCount)];
  tempArray.map((value, index) => {
    console.log(value, index);
  });
  return (
    <>
      {children}
      <div>Total Count : {count}</div>
      <button onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>

      {hasClicker ? (
        <>
          {/* <Clicker
            increment={increment}
            keyName="countA"
            color={`hsl(${Math.random() * 360}deg,100%,70%)`}
          /> */}
          {/* <Clicker
            increment={increment}
            keyName="countB"
            color={`hsl(${Math.random() * 360}deg,100%,70%)`}
          /> */}
          {[...Array(clickersCount)].map((value, index) => {
            return (
              <Clicker
                key={index}
                increment={increment}
                keyName={`count${index}`}
                color={colors[index]}
              />
            );
          })}
        </>
      ) : null}
      <People />
    </>
  );
}
