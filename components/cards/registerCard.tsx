import { useState } from "react";
import { Input } from "../input";
import axios from "axios";

export function NewCardForm() {
  const [name, setName] = useState("");

  function submitForm() {
    axios.post('/api/card', {name}).then(response => alert(response))
  }

  return (
    <form>
      <Input value={name} onChange={(e) => setName(e.currentTarget.value)} />
      <button onClick={submitForm} type="button">Enviar</button>
    </form>
  );
}


