import {
	Heading,
	Paragraph,
	Columns,
  Column,
	Group,
	List,
  ListItem,
	Buttons,
  Button,
	Image,
  Html,
	Embed,
} from './coreBlocks'
import Container from './components/Container'
import ConditionalWrapper from './components/ConditionalWrapper'
import { classNames } from './utils/classNames'
import { deepMerge } from './utils/deepMerge'
import { useBlockConfig } from './hooks/useBlockConfig'

export default function Block({
	block,
	// blockConfig, at some point in future, allow this prop to override the blockConfig on a per-block basis by conditionally wrapping the rendered block with another <BlockConfigProvider />
	isNested = false,
	parentBlock,
	containerClasses = '',
	container, // dev has the ability to override the default container function -- this prop is only useful when dev is explicitly rendering <Block /> (not common) --> <Blocks /> does not pass 'container' to Block as prop, instead it uses context (see useBlockConfig() below)
	containerCondition,	// dev has the ability to override the default condition that determines whether to wrap a block with a container -- this prop is only useful when dev is explicitly rendering <Block /> (not common) --> <Blocks /> does not pass 'container' to Block as prop, instead it uses context (see useBlockConfig() below)
  prevSibling, // the block data for the current block's previous sibling block
  nextSibling, // the block data for the current block's next sibling block
	...props
}) {

  const {
    container: globalCustomContainer,
    containerCondition: globalCustomContainerCondition,
    blocks: blockConfig
  } = useBlockConfig()
  
    
  const SmallContainer = ({block}) => <Container innerClassName={classNames("max-w-3xl lg:max-w-4xl", block.config.containerClasses)}>{block.rendered}</Container>
  
  /*  
    cloakwp provides simple/sensible defaults for core block components, the block container, 
    and the condition for which the block container is used --> devs can override all these 
    defaults via props or context (when using our <BlockConfigProvider>)
  */
  const defaults = {
    container: ({block}) => <Container className={classNames("relative", block.config.containerClasses)}>{block.rendered}</Container>,
    containerCondition: ({block}) => !block.isNested,
    blocks: {
      'core/paragraph': {
        component: Paragraph,
        container: SmallContainer,
        containerClasses: 'py-2',
      },
      'core/heading': {
        component: Heading,
        container: SmallContainer,
        containerClasses: 'py-2',
      },
      'core/image': {
        component: Image,
        container: SmallContainer,
        containerClasses: 'py-2',
      },
      'core/embed': {
        component: Embed,
        container: SmallContainer,
        containerClasses: 'py-2',
      },
      'core/html': {
        component: Html,
        container: true,
        containerClasses: 'py-2',
      },
      'core/columns': {
        component: Columns,
        container: false,
      },
      'core/column': {
        component: Column,
        container: false,
      },
      'core/group': {
        component: Group,
        container: false,
      },
      'core/list': {
        component: List,
        container: SmallContainer,
      },
      'core/list-item': {
        component: ListItem,
        container: false,
      },
      'core/buttons': {
        component: Buttons,
        container: SmallContainer,
        containerClasses: 'py-2'
      },
      'core/button': {
        component: Button,
        container: true,
      },
    }
  } 

  const finalConfig = deepMerge( // deeply merges the following configs to produce a final "master" config
    {...defaults.blocks}, // lowest priority (defaults)
    {...blockConfig} // highest priority (<Block blockConfig={{...}} />)
  )[block.blockName] // immediately after deep merging, we pick out the specific block we're currently rendering from the final config
  
  if(!finalConfig) {
    console.error(`Failed to render Block (${block.blockName}) due to missing config object for this particular block. You probably didn't provide a 'blocks' prop to your <Blocks /> component, or failed to include a sub-object for '${block.blockName}'.`)
    return <></>
  }

  const possibleContainers = [ // an array of all the possible containers to use for this Block, where index 0 takes highest priority
    container, // container prop on <Block /> -- a rare case where dev is explicitly rendering <Block /> rather than <Blocks /> and passing a 'container' prop (highest priority)
    blockConfig[block.blockName]?.container, // container specified in blockConfig for this specific block (2nd priority)
    globalCustomContainer, // container prop on <Blocks /> or nearest BlockConfigProvider context (3rd priority)
    defaults.blocks[block.blockName]?.container, // default container specified by cloakwp for this specific block (4th priority)
    defaults.container // default global container specified by cloakwp (last priority)
  ] // note: there are 4 ways for package users to provide a custom container (and a default container provided by us)
  const finalContainer = possibleContainers.filter(cntr => typeof cntr == "function")[0] // filter out non-component & non-boolean containers, then pick off the 1st one (smallest index == highest priority)

  let containerEnabled = true;
  possibleContainers.every((cntr, index) => { // stops iterating when we return false
    if(cntr === false) { // we found a falsy container value before we found a container function, which means we set containerEnabled = false and don't render a container
      containerEnabled = false
      return false // equivalent to 'break;'
    }
    if(typeof cntr == "function") {
      return false // we found a container function before we found a falsy value, which means we leave containerEnabled = true
    }
    return true // equivalent to 'continue;' and is required for 'every()'
  })

  const possibleContainerConditions = [ // same idea as 'possibleContainers' above ^ .. a container condition is a function that returns true/false to determine if this block gets rendered inside a container or not
    containerCondition,
    blockConfig[block.blockName]?.containerCondition,
    globalCustomContainerCondition,
    defaults.blocks[block.blockName]?.containerCondition,
    defaults.containerCondition,
  ]
  const finalContainerCondition = possibleContainerConditions.filter(condition => typeof condition == "function")[0]
  
  const { component: Component, props: configProps = {} } = finalConfig
  const finalProps = deepMerge( // merge custom props provided to Block component with custom props provided by default/block config
    configProps,
    props
  )

  if(!Component) {
    console.error(`Failed to render Block (${block.blockName}) due to a missing component. You probably didn't provide this block with a 'component' property in your 'blocks' object.`)
    return <></>
  }

  const blockObj = {
    isNested,
    data: block,
    parent: parentBlock,
    config: finalConfig,
    prevSibling,
    nextSibling,
  }

  return (
    <ConditionalWrapper
      condition={() => containerEnabled ? finalContainerCondition?.({block: blockObj, finalProps}) : false}
      wrapper={(children) => finalContainer?.({block: {...blockObj, rendered: children}, finalProps})}
    >
      <Component block={blockObj} {...finalProps} />
    </ConditionalWrapper>
  )
}