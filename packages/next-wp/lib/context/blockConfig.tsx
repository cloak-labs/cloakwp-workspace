import { createContext } from "react";
import { useBlockConfig } from '../hooks/useBlockConfig'
import { deepMerge } from '../utils/deepMerge'

export const BlockConfigContext = createContext({});

const BlockConfigProvider = ({
  blocks,
  container,
  containerCondition,
  merge = true, // when true, we deepMerge 'blocks' with previously set blocks from higher-up context.. otherwise when false, 'blocks' totally overrides previous context
  children
}) => {

  const {
    container: prevContainer = null,
    containerCondition: prevContainerCondition = null,
    blocks: prevBlocks = {}
  } = useBlockConfig() // grabs next closest block config from higher up the component tree (doesn't necessarily exist)

  const isNewConfig = blocks || container || container == false || containerCondition // boolean --> when false (no props provided), we don't bother rendering Context Provider, we just render the children

  let config = {
    container: container ?? prevContainer,
    containerCondition: containerCondition ?? prevContainerCondition,
    blocks: merge ? deepMerge(prevBlocks, blocks) : blocks ?? prevBlocks,
  }

  return (
    <>
      {isNewConfig ? (
        <BlockConfigContext.Provider value={config}>
          {children}
        </BlockConfigContext.Provider>
      ) : children}
    </>
  )
}

export default BlockConfigProvider