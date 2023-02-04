import Link from "next/link"
import { fetchAPI } from '../../lib/strapi/api'

interface LayoutProps {
    children: React.ReactNode
}

export default async function Page ({children}: LayoutProps) {

    let posts = await fetchAPI('/posts')

    return (
        <div className='w-full flex flex-col md:flex-row gap-8'>
            <ul className='flex-none'>
                {posts.data.map(({id, attributes}: {id: number, attributes: any}) =>
                    <li key={`movie-${attributes.slug}`}
                        className='hover:underline cursor-pointer'
                    >
                        <Link href={`/posts/${attributes.slug}`} prefetch={false}>{attributes.title}</Link>
                    </li>
                )}
            </ul>
            <div>
                {children}
            </div>
        </div>
    )
}