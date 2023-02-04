'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import {NavLink} from "../app/nav-link";
interface NavLinkProps {
    href: string
    children: React.ReactNode
}
export const NavBar = () => {

    return (
        <div className='navbar bg-primary text-neutral-content'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/posts'>Posts</NavLink>
        </div>
    )
}