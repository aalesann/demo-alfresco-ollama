import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='bg-primary p-3 mb-3'>
        <Link className="text-decoration-none text-light shadow p-2 rounded" to={'/'}>
          Home
        </Link>
        
        <Link className="text-decoration-none text-light shadow p-2 rounded mx-2" to={'/ollama'}>
          Ollama
        </Link>

        <Link className="text-decoration-none text-light shadow p-2 rounded" to={'/alfresco'}>
          Alfresco
        </Link>
      </nav>
  )
}
