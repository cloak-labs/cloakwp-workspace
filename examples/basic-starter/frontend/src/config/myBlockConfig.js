import {
  TestimonialBlock,
  CardsGridBlock,
  FaqsBlock,
  ButtonBlock,
  H4Block,
  HeroBlock
} from '@/components/Blocks'

const myBlockConfig = {
  // We can override/extend how core blocks render like so:
  'core/heading': { // here we aren't overriding the heading block's Component or anything else, we're only extending it by adding custom props -- behind the scenes, it does a deep object merge rather than a full object override 
    props: { // you can provide "props" where the children properties will get applied as component props to the associated Block component  
      tags: {
        4: H4Block // the core/heading block has a built-in unique prop where we can override how each heading level gets rendered (here we're providing a custom Block Wrapper component specifically for H4 headings)
      },
      className: "mb-3" // you can add custom classes to built-in core block components
    }
  },
  'core/button': {
    component: ButtonBlock // here's an example of totally overriding a core block's component 
  },
  // below we map our custom ACF Blocks to our custom components
  'acf/hero': {
    component: HeroBlock,
    container: false,
    // containerClasses: 'py-12',
  },
  'acf/cards': {
    component: CardsGridBlock,
    container: true,
    containerClasses: 'py-12',
  },
  'acf/testimonial': {
    component: TestimonialBlock,
    container: true,
  },
  'acf/faq': {
    component: FaqsBlock,
    container: false,
  },
}

export default myBlockConfig