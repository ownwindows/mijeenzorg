'use client'
import Link from 'next/link'
import {useSelectedLayoutSegment} from 'next/navigation'
import {NavLink} from '../../app/nav-link'

interface NavLinkProps {
    href: string
    children: React.ReactNode
}

export const Logo = () => {

    return (
        <Link href='/'><h1>mijeenzorg</h1></Link>
    )
}