import { NavLink } from './nav-link'
import '../styles/globals.css'
import {NavBar} from "../components/nav-bar";

export default function RootLayout ({children}: { children: React.ReactNode }) {
    return (
        <html lang='nl' data-theme='dark'>
        <body className='px-28'>
        <header>
            <NavBar/>

        </header>
        <div className='mt-4'>
            {children}
        </div>
        </body>
        </html>
    )
}