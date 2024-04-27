import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import { OllamaPage } from "../pages/OllamaPage";
import { AlfrescoPage } from "../pages/AlfrescoPage";


  const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/ollama',
        element: <OllamaPage />
    },
    {
        path: '/alfresco',
        element: <AlfrescoPage />
    }
  ])

export const AppRouter = () => {
  return (
       <RouterProvider router={routes} />
  )
}
