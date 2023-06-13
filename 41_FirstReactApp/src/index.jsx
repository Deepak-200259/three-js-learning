import "./style.css";
import App from "./app.jsx";
import { createRoot } from "react-dom/client";
const root = createRoot(document.querySelector("#root"));
let i = 0;
root.render(
  <>
    <App clickersCount={4}>
      <h1>My First React App</h1>
      <h2>And a Fancy Subtitle</h2>
    </App>

    {/* <App
      children={
        <>
          <h1>My First React App</h1>
          <h2>And a Fancy Subtitle</h2>
        </>
      }
    /> */}
    {/* Component */}
  </>
);
