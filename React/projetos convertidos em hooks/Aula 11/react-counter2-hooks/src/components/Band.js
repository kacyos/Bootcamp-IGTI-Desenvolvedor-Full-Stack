import React, { useState } from "react";

const BAND_MEMBERS = [
  {
    id: 1,
    name: "Neil Peart",
    instrumet: "Bateria",
  },
  {
    id: 2,
    name: "Alex Lifeson",
    instrumet: "Guitarra",
  },
  {
    id: 3,
    name: "Geddy Lee",
    instrumet: "Baixo",
  },
];

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState("Rush");

  return (
    <div>
      <ul>
        <h4>{bandName}</h4>
        {bandMembers.map(({ id, name, instrumet }) => {
          return (
            <li key={id}>
              {name} - {instrumet}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
