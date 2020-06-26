import React, { useState } from "react";
import { wait } from "@testing-library/react";
import Users from "./components/users/Users";
import Toggle from "./components/toggle/Toggle";
import { useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        "https://randomuser.me/api/?seed=rush&nat=br&results=10"
      );

      const json = await res.json();
      setUsers(json.results);
    };

    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <div>
      <h3>React LifeCycle</h3>
      <Toggle
        description="Mostrar usuários:"
        enable={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />
      {showUsers && <Users users={users} />}
    </div>
  );
}
