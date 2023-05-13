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
export { useSlugModifier } from './hooks/useSlugModifier';
export { useBlockStyleBuilder } from './hooks/useBlockStyleBuilder';
export { usePage } from './hooks/usePage';
export { usePreview } from './hooks/usePreview';
export { usePost } from './hooks/usePost';
export { usePosts } from './hooks/usePosts';
export { usePaths } from './hooks/usePaths';
export { useFetchGraphAPI } from './hooks/useFetchGraphAPI';
export { useFetchRestAPI } from './hooks/useFetchRestAPI';
export { useUser } from './hooks/useUser';

// Utils
export { deepMerge } from './utils/deepMerge'
export { classNames } from './utils/classNames'

// API
export { default as regenerateStaticPage } from './api/revalidate'
export { default as enablePreviewMode } from './api/enablePreviewMode'
export { default as exitPreviewMode } from './api/exitPreviewMode'
export { default as setLoggedIn } from './api/setLoggedIn'
export { default as setLoggedOut } from './api/setLoggedOut'
