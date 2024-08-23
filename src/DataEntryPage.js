import React, { useState } from "react";

const DataEntryPage = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URI}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, age }),
    });

    if (res.ok) {
      setUsername("");
      setAge("");
      alert("Data submitted successfully");
    } else {
      alert("Failed to submit data");
    }
  };

  return (
    <div>
      <h1>Data Entry</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataEntryPage;
