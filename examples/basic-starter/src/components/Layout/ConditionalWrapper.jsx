// Common helper component used whenever you need to conditionally wrap another component(s)
// Credit (includes tweaks): https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2

export const ConditionalWrapper = ({ condition, wrapper, children }) => {
  const passesCondition = (typeof condition === "function") ? condition() : condition 
  return passesCondition ? wrapper(children) : children
}