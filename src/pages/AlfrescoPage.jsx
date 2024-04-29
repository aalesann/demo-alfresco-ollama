import { useEffect, useState } from "react"
import { Navbar } from "../ui/Navbar"
import http from "../api/http";

export const AlfrescoPage = () => {
    const urlBase = 'http://localhost:8081/alfresco/api/-default-/public/alfresco/versions/1';

    // Sitios
    const [sites, setSites] = useState({})
    // Nodos hijos
    const [nodes, setNodes] = useState({});
    // Información de un nodo específico
    const [nodeInfo, setNodeInfo] = useState({});
    // input donde se coloca el id de un nodo para averiguar su contenido
    const [inputNodeParent, setInputNodeParent] = useState('')
    // Input donde se coloca el id de un nodo para averiguar su información
    const [inputNodeInfo, setInputNodeInfo] = useState('')

    const [serverError, setServerError] = useState('')


    const [toggleSite, setToggleSite] = useState(true);
    const [toggleChildrens, setToggleChildrens] = useState(true);
    const [toggleNodeInfo, setToggleNodeInfo] = useState(true);


    // Obtiene todos los sitios del servidor de Alfresco
    const obtenerSitios = async () => {
        const headers = {
            'Authorization': `Basic ${btoa('admin:admin')}`,
        }

        try {
            const data = await http.get(`${urlBase}/sites`, { headers });
            setSites(data)
            setToggleSite(false);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    (async () => {
        try {
            const response = await fetch(`${urlBase}/sites`);
            if(response.ok) return true;
        } catch (error) {
            console.log(error)
            setServerError("Servicio No disponible")
        }
    })();


    // Obtiene todos los nodos hijos (carpetas y archivos) del nodo con ID recibido
    const obtenerNodosHijos = async (parentId) => {
        const headers = {
            'Authorization': `Basic ${btoa('admin:admin')}`,
        }

        const data = await http.get(`${urlBase}/nodes/${parentId}/children`, { headers })
        setNodes(data);
        setToggleChildrens(false)
    }

    // Obtiene la información de un nodo específico (carpeta o archivo) del nodo con ID recibido
    const obtenerInfoNodo = async (nodeId) => {
        const headers = {
            'Authorization': `Basic ${btoa('admin:admin')}`,
        }

        const data = await http.get(`${urlBase}/nodes/${nodeId}`, { headers })
        setNodeInfo(data);
        setToggleNodeInfo(false);
    }

    useEffect(() => {
        // Ejemplo de implementación con fetch API. (eliminar)
        fetch(urlBase + '/sites', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa('admin:admin')}`
            }
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))


        // TODO añadir a la clase HttpRequest, un método para obtener el documento, luego crear una función en este componente para implementar dicho método
        // fetch(urlBase + `/nodes/b81abc2b-36be-4d98-a33a-e7ca6784f044/content`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Basic ${btoa('admin:admin')}`
        //     }
        // })
        //     .then(resp => resp.blob())
        //     .then(blobFile => {
        //         const urlFile = URL.createObjectURL(blobFile);
        //         const htmlLink = document.createElement('a');
        //         htmlLink.href = urlFile;
        //         htmlLink.download = "archivoNuevo"
        //         htmlLink.innerText = "Descargar Archivo"
        //         document.body.appendChild(htmlLink)
        //     })
        //     .catch(err => console.log(err))
    }, [])


    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="mt-4">Alfresco Page</h1>
                <hr />

                {
                    (serverError)
                        ? (
                            <div className="alert h4 alert-danger p-2 text-center">
                                {serverError}
                            </div>
                        )
                        : (
                            <>
                                {/* SECCION SITIOS */}
                                <section className="mb-3 border p-2 rounded">
                                    <h3>Obtener sitios</h3>
                                    <code hidden={toggleSite && true}>
                                        <pre>
                                            {
                                                JSON.stringify(sites, null, 3)
                                            }
                                        </pre>
                                    </code>

                                    <button
                                        onClick={obtenerSitios}
                                        className="btn btn-sm btn-primary"
                                    >send</button>

                                    <button
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                        onClick={() => setToggleSite(!toggleSite)}
                                    >
                                        {(toggleSite ? 'Show' : 'Hide')}
                                    </button>
                                </section>

                                {/*  SECCION NODOS HIJOS */}
                                <section className="mb-3 border p-2 rounded">
                                    <h3>Obtener Nodos Hijos</h3>
                                    <code hidden={toggleChildrens && true}>
                                        <pre>
                                            {
                                                JSON.stringify(nodes, null, 3)
                                            }
                                        </pre>
                                    </code>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        onChange={(e) => setInputNodeParent(e.target.value)}
                                        value={inputNodeParent}
                                    />
                                    <button
                                        onClick={() => obtenerNodosHijos(inputNodeParent)}
                                        className="btn btn-sm btn-primary"
                                    >send</button>

                                    <button
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                        onClick={() => setToggleChildrens(!toggleChildrens)}
                                    >
                                        {(toggleChildrens ? 'Show' : 'Hide')}
                                    </button>
                                </section>

                                {/* SECCIÓN INFO DE UN NODO */}
                                <section className="mb-3 border p-2 rounded">
                                    <h3>Información de un Nodo</h3>
                                    <code hidden={toggleNodeInfo && true}>
                                        <pre>
                                            {
                                                JSON.stringify(nodeInfo, null, 3)
                                            }
                                        </pre>
                                    </code>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        onChange={(e) => setInputNodeInfo(e.target.value)}
                                        value={inputNodeInfo}
                                    />
                                    <button
                                        onClick={() => obtenerInfoNodo(inputNodeInfo)}
                                        className="btn btn-sm btn-primary"
                                    >send</button>

                                    <button
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                        onClick={() => setToggleNodeInfo(!toggleNodeInfo)}
                                    >
                                        {(toggleNodeInfo ? 'Show' : 'Hide')}
                                    </button>
                                </section>
                            </>
                        )
                }
            </div>
        </>
    )
}
