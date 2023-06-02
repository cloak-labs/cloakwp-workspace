// Context
// export { CloakWP } from './context/blockConfig';
export { default as BlockConfigProvider } from './context/blockConfig';

// Components
export { default as Blocks } from './Blocks'
export { default as Block } from './Block'
export { default as Container } from './components/Container'
export { default as ConditionalWrapper } from './components/ConditionalWrapper'
export { default as Link } from './components/Link'
export { AdminBar } from './components/AdminBar'

// Hooks
export { useGlobalConfig } from './hooks/useGlobalConfig';
export { useBlockConfig } from './hooks/useBlockConfig';
export { useBlockStyleBuilder } from './hooks/useBlockStyleBuilder';
export { getPage } from './getters/getPage';
export { useFetchGraphAPI } from './hooks/useFetchGraphAPI';
export { useFetchRestAPI } from './hooks/useFetchRestAPI';
export { useUser } from './hooks/useUser';

// Getters
export { getPreviewData } from './getters/getPreviewData';
export { getPost } from './getters/getPost';
export { getPosts } from './getters/getPosts';
export { getPaths } from './getters/getPaths';
export { getMenus } from './getters/getMenus';

// Utils
export { slugModifier } from './utils/slugModifier';
export { deepMerge } from './utils/deepMerge'
export { classNames } from './utils/classNames'

// API
export { default as regenerateStaticPage } from './api/revalidate'
export { default as enablePreviewMode } from './api/enablePreviewMode'
export { default as exitPreviewMode } from './api/exitPreviewMode'
export { default as setLoggedIn } from './api/setLoggedIn'
export { default as setLoggedOut } from './api/setLoggedOut'
