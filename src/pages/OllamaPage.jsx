import { useEffect, useState } from "react"
import { Navbar } from "../ui/Navbar"
import http from "../api/http"
import axios from "axios";
import { formatModelResponse } from "../helpers/formatModelResponse";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import './OllamaPage.css';

export const OllamaPage = () => {

  const model = 'llama3:instruct';

  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('')

  const urlBase = 'http://localhost:11434/api/generate'

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }


  const handleInputChange = (e) => {
    setPrompt(e.target.value)
  }


  const preguntarAlModelo = async (e) => {
    e.preventDefault();

    const body = {
      model,
      prompt,
    }

    const response = await http.post(urlBase, body, config);
    const fullResponse = formatModelResponse(response);
    setPrompt('')
    console.log(fullResponse)
    setResponseText(fullResponse);
  }

  return (
    <>

      <Navbar />
      <div className="container p-2 border rounded">
        <h1 className="p-1 bg-primary text-light rounded text-center" >Charla con el Instructor</h1>
        <hr />
        {/* <p>{responseText}</p> */}
        <div className="content p-2 rounded">
          <Markdown remarkPlugins={[remarkGfm]}>
            {(loading) ? 'Cargando...' : responseText}
          </Markdown>
        </div>
        <div className="input-area">
        <form className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control shadow"
            placeholder="Pregunta algo..."
            value={prompt}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-md shadow btn-primary"
            onClick={preguntarAlModelo}
          >
            Send
          </button>
        </form>
        </div>
      </div>
    </>

  );
}
