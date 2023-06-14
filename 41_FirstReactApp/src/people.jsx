import { useEffect, useState } from "react";
export default function People() {
  // const [people, setPeople] = useState([
  //   { id: 1, name: "John" },
  //   { id: 2, name: "Jane" },
  //   { id: 3, name: "Sudo" },
  //   { id: 4, name: "Boy" },
  // ]);
  const [people, setPeople] = useState([]);

  // const getPoeple = () => {
  //   const request = fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  // };
  const getPoeple = async () => {
    const request = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await request.json();
    setPeople(response);
  };

  useEffect(() => {
    getPoeple();
  }, []);
  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
