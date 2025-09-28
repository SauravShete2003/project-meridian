import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name,setName]=useState(""), [email,setEmail]=useState(""), [mobile,setMobile]=useState(""), [password,setPassword]=useState("");

  const load = async () => {
    const { data } = await API.get("/agents");
    setAgents(data);
  };

  useEffect(()=>{ load(); },[]);

  const add = async (e)=>{
    e.preventDefault();
    await API.post("/agents",{name,email,mobile,password});
    load();
  }

  return (
    <div>
      <h2>Agents</h2>
      <form onSubmit={add}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} />
        <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {agents.map(a => <li key={a._id}>{a.name} - {a.email}</li>)}
      </ul>
    </div>
  );
}