import { fetchAPI } from "../../../lib/strapi/api"
import Image from './image'
import TransformImage from './xform-image'

interface PageProps {
    params: {
        slug: string
    }
}

export default async function Page ({params}: PageProps) {

    const result = await fetchAPI('/posts', {
        filters: { slug: params.slug },
        // populate: ['image']
    })

    if ( result.data?.length > 0 && result.data[0] ) {
        const { id, attributes: post } = result.data[0]

        const image = post.image?.data.attributes

        return (
            <div className='prose'>
                <h2>{post.title}</h2>
                <p className='font-bold'>{post.intro}</p>
                {/*<Image {...post.image.data.attributes} />*/}
                <TransformImage
                    public_id={image?.provider_metadata.public_id}
                    transformations='q_70,w_768,ar_1.5,c_crop'
                    ext='webp'
                />
                <p className='mt-4'>{post.body}</p>
            </div>
        )
    }

    return <>Nothing found</>
}

export async function generateStaticParams () {
    let result = await fetchAPI('/posts')
    return result.data.map(({id, attributes}: {id: number, attributes: any}) => (
        {slug: attributes.slug}
    ))
}