import Block from './Block'
import BlockConfigProvider from './context/blockConfig'

export default function Blocks({data, blocks, container, containerCondition, merge = true, ...props}) {
	return (		
    <BlockConfigProvider blocks={blocks} container={container} containerCondition={containerCondition} merge={merge}>
      {data?.map((block, i) => (
        <Block
          key={i}
          block={block}
          prevSibling={i == 0 ? null : data[i-1]}
          nextSibling={i == data.length-1 ? null : data[i+1]}
          {...props}
        />
      ))}
    </BlockConfigProvider>
	)
}