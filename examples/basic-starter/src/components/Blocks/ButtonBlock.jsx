import { useGlobalConfig } from "cloakwp"
import { Button } from "@/components/Button"
import { useBlockStyleBuilder } from "cloakwp"

export function ButtonBlock({block}) {
    const config = useGlobalConfig()
    const {classes, styles} = useBlockStyleBuilder(block.data)
    let { backgroundColor, className, text, url } = block.data.attrs

    let color = 'navy'
    if(backgroundColor.includes('gray')) color = 'gray'
    else if(backgroundColor.includes('blue')) color = 'baby'
    else if(backgroundColor == 'blue-900') color = 'black'

    let variant = 'outline'
    if(className.includes('is-style-fill')) variant = 'solid'

    if(url.includes(config.wpUrl)) url = url.replace(config.wpUrl, '/')

    return <Button href={url} color={color} variant={variant}>{text}</Button>
}