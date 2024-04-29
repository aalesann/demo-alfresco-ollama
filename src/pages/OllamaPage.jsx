import { useState } from "react"

import { Navbar } from "../ui/Navbar"
import { Spinner } from "../components/Spinner";

import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import { formatModelResponse } from "../helpers/formatModelResponse";
import http from "../api/http"

import './OllamaPage.css';

export const OllamaPage = () => {

  const model = 'llama3:8b';

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

    setLoading(true);
    setPrompt('');
    
    const response = await http.post(urlBase, body, config);
    const fullResponse = formatModelResponse(response);
    
    setLoading(false);
    setResponseText(fullResponse);
  }

  return (
    <>

      <Navbar />
      <div className="container p-2 border rounded">
        <h1 className="p-1 bg-primary text-light rounded text-center" >Charla con el Instructor</h1>
        <hr />
        <div className="content p-2 rounded">
          {(loading)
            ? (
              <div className="d-flex h-100 justify-content-center align-items-center">
                <Spinner className="mx-auto" />
              </div>
            )
            : (
              <Markdown remarkPlugins={[remarkGfm]}>
                {responseText}
              </Markdown>
            )
          }
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
