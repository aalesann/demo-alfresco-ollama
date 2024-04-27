import { useEffect, useState } from "react"
import { Navbar } from "../ui/Navbar"
import http from "../api/http"
import axios from "axios";
import { formatModelResponse } from "../helpers/formatModelResponse";

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

  useEffect(() => {
    const fetchModelResponse = async () => {

      const body = {
        model,
        prompt: 'Eres un experto en Programación y debes responder al usuario. Saluda al usuario sólo al inicio de la conversación.'
      }

      try {
        setLoading(true);
        const response = await axios.post(urlBase, body, config);
        const fullResponse = formatModelResponse(response);

        setResponseText(fullResponse);
        setLoading(false);

      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setLoading(false);
      }
    };

    fetchModelResponse();
  }, []);


  const handleInputChange = (e) => {
    setPrompt(e.target.value)
  }


  const preguntarAlModelo = async (e) => {
    e.preventDefault();

    const body = {
      model,
      prompt, 
    }

    const response = await http.post(urlBase, body , config);
    const fullResponse = formatModelResponse(response);
    setPrompt('')
    console.log(fullResponse)
    setResponseText(fullResponse);
  }

  return (
    <>

      <Navbar />
      <div className="container pt-4 px-3 pb-2 border rounded">
        <h1 className="p-2 bg-primary text-light rounded text-center" >OllamaPage</h1>
        <hr />
        {/* <p>{responseText}</p> */}
        <textarea
          className="form-control mb-3"
          value={(loading) ? 'Cargando...' : responseText}
          // onChange={handleTextareaChange}
          rows="15"
          cols="50"
          style={{ width: '100%' }}
          readOnly
        />

        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Pregunta algo..."
            value={prompt}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={preguntarAlModelo}
          >
            Send
          </button>
        </form>
      </div>
    </>

  );
}
