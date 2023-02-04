
interface Props {
    public_id: string
    transformations: string
    ext: string
}

const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const TransformImage = (props: Props) => {

    const {public_id, transformations='w_512', ext='jpg'} = props

    if ( public_id ) {
        return (
            <img src={`https://res.cloudinary.com/${name}/image/upload/${transformations}/${public_id}.${ext}`} />
        )
    }

    return <></>
}

export default TransformImage