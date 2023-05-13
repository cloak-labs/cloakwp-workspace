// Code taken from: https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({ condition, wrapper, children, args }) => {
    const passesCondition = (typeof condition === "function") ? condition() : condition 
    return passesCondition ? wrapper(children, args) : children
}

export default ConditionalWrapper