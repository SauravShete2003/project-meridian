import { useState } from "react";
import API from "../api/axios";

export default function Upload() {
  const [file, setFile] = useState();

  const submit = async (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("file", file);
    const { data } = await API.post("/upload", form);
    console.log("Assigned:", data);
    alert("Uploaded and distributed!");
  }

  return (
    <form onSubmit={submit}>
      <h2>Upload CSV/XLSX</h2>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button>Upload</button>
    </form>
  );
}