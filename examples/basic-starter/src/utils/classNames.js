import { twMerge } from 'tailwind-merge'

/* 
   This function is heavily used throughout the site's markup. It is used inside (or outside) of
   a JSX 'className' prop to conditionally include certain classes or not. It also abstracts away 
   twMerge, which gets rid of clashing Tailwind classes and allows component default styles to be 
   easily overriden without having to write any of your own merging/overriding logic.
*/
export default function classNames(...classes) {
    return twMerge(classes.filter(Boolean).join(' '));
}