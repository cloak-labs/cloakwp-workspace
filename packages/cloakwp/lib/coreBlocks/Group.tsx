import Block from "../Block"
import ConditionalWrapper from "../components/ConditionalWrapper"
import Container from "../components/Container"
import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder"
import { classNames } from "../utils/classNames"

export default function Group({block}) {
    const {classes, styles} = useBlockStyleBuilder(block.data)

    if(!block?.data?.innerBlocks) return <></>

    const { layout, align } = block.data.attrs
    const numBlocks = block?.data?.innerBlocks?.length

    const groupClasses = classNames(
        'flex gap-x-4 md:gap-x-6 flex-wrap',
        layout.type == 'flex' ? (
            layout.flexWrap ? 'flex-row' : 'flex-col'
        ) : 'flex-col',
        numBlocks <= 2 ? 'sm:flex-nowrap' : (
            numBlocks <= 3 ? 'md:flex-nowrap' : (
                numBlocks <= 4 ? 'lg:flex-nowrap' : ''
            )
        )
    )

    if(align != 'full'){
        return (
            <Container className={classNames("relative")}>
                <div
                    className={classNames(styles.margin && 'rounded-lg', groupClasses, classes)}
                    style={styles}
                >
                    {block?.data?.innerBlocks?.map((innerBlock, index) => <Block key={index} block={innerBlock} parentBlock={block.data} isNested={true} className="min-w-[150px]" /> )}
                </div>
            </Container>
        )
    }else{
        return (
            <div
                className={classNames(classes)}
                style={styles}
            >
                <Container className="relative" innerClassName={groupClasses}>
                    {block?.data?.innerBlocks?.map((innerBlock, index) => <Block key={index} block={innerBlock} parentBlock={block.data} isNested={true} className="min-w-[150px]" /> )}
                </Container>
            </div>
        )
    }
}