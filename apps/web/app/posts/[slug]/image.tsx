
type Image = {
    url: string
    width: number
    height: number
}

interface Props extends Image {
    alternativeText: string
    formats: {
        thumbnail: Image
        small: Image
        large: Image
        medium: Image
    }
}

const Image = (props: Props) => {
    return (
        <img
            srcSet={`${props.formats.small.url} ${props.formats.small.width}w,
                     ${props.formats.medium.url} ${props.formats.medium.width}w,
                     ${props.formats.large.url} ${props.formats.large.width}w`}
            sizes='(max-with: 30em) 30em, 100vw'
            src={props.url}
            alt={props.alternativeText}
        />
    )
}

export default Image