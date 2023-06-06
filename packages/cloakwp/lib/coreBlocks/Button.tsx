import { useGlobalConfig } from "../hooks/useGlobalConfig"
import Button from "../components/Button" 
import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder"

export default function ButtonBlock({block}) {
    const config = useGlobalConfig()
    const {classes, styles} = useBlockStyleBuilder(block.data)
    let { backgroundColor, className, text, url } = block.data.attrs

    let color = 'white'
    if(backgroundColor == 'gray-900') color = 'black'
    else if(backgroundColor.includes('gray')) color = 'gray'

    let variant = 'solid'
    if(className.includes('is-style-outline')) variant = 'outline'

    const wpUrl = config.sources[block.dataSource].url
    if(url.includes(wpUrl)) url = url.replace(wpUrl, '/')

    return <Button href={url} color={color} variant={variant} wpClasses={classes} style={styles}>{text}</Button>
}