import { useBlockStyleBuilder } from '../hooks/useBlockStyleBuilder'
import parse from 'html-react-parser'
import { classNames } from '../utils/classNames'
import Block from '../Block'

export default function List({block, className}) {
    const {classes, styles} = useBlockStyleBuilder(block.data)
    const { attrs: { ordered, values }, innerBlocks } = block.data
    // const { ordered, values } = attrs

    // console.log("These are supposed to be innerBlocks:", classes)
    let newListItemRenderingMethod = false
    if(innerBlocks.length){
        // using WP v6.1 or later, where the core/list-item inner block was introduced rather than baking all the <li>'s into the block.attrs.values field
        newListItemRenderingMethod = true
    }
    const ListType = ordered ? 'ol' : 'ul'

    return (
        <ListType className={classNames("space-y-3 pb-6", ListType == 'ul' ? "list-disc" : "list-decimal", classes, className)} style={styles}>
            {newListItemRenderingMethod ? (
                innerBlocks?.map((block, i) => <Block key={i} block={block} />)
            ) : parse(values)}
        </ListType>
    );
}