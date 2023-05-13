import Block from "../Block";
import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder";
import { classNames } from "../utils/classNames";

export default function Column({block, width, index, numColumns, className}) {
    // console.log('** column block: ', block)
    const {classes, styles} = useBlockStyleBuilder(block.data)

    let colSpan = 6 // default to 50% if no column width is defined
    
    if(width){ // given a percentage width, we need to find the closest matching column width from our 12-column grid system (i.e. 50% == col-span-6, and 52% also == col-span-6)
        const gridColWidths = [8.333, 16.667, 25, 33.333, 41.667, 50, 58.333, 66.667, 75, 83.333, 91.667, 100]
        let lastDiff = 101
        for(let i = 0; i < gridColWidths.length; i++){
            let gridColWidth = gridColWidths[i]
            if(width == gridColWidth) { // if we find an exact match, that makes our life easy and we can break out of the loop
                colSpan = i + 1
                break
            }
    
            // otherwise, we search for the closest grid column match:
            let diff = Math.abs(gridColWidth - width)
            if(diff < lastDiff) colSpan = i + 1
            else if(diff > lastDiff) break // we're getting farther from the closest grid col width, so we know we already found the closest and can therefore break out of the loop
            lastDiff = diff
        }
    }

    return(
        <div 
            className={classNames(
                'flex flex-col',
                `col-span-${colSpan}`,
                numColumns == 2 && 'space-y-3',
                (numColumns > 2 && numColumns <= 4) && 'space-y-2',
                (numColumns > 4 && numColumns <= 6) && 'space-y-1',
                numColumns > 6 && 'space-y-0.5',
                classes,
                className
            )} 
            style={styles}
            data-cloakwp-column="true"
        >
            {block?.data?.innerBlocks?.map((innerBlock, index) => <Block key={index} block={innerBlock} parentBlock={block} isNested={true} /> )}  
        </div>
    )
}