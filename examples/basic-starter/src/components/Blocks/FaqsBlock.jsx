import { FaqAccordions } from "@/components/FAQs";
import { useBlockStyleBuilder } from "cloakwp";
import parse from "html-react-parser";

export function FaqsBlock({block}) {
    const { classes, styles } = useBlockStyleBuilder(block.data)
    const { title, faq_posts } = block.data.attrs.data
    const faqsData = faq_posts?.value?.map(faq => ({
      id: faq.ID,
      question: faq.post_title,
      answer: parse(faq.post_content)
    }))

    const { backgroundColor: bg } = block.data.attrs
    const bgColor = bg.substring(0, bg.indexOf('-')) // eg. strips "blue" out of "blue-900"
    const bgHue = parseInt(bg.substring(bg.indexOf('-')+1, bg.length)) // eg. strips "900" out of "blue-900" (and converts to integer)
    let lightBg = true
    if( bgColor == 'blue' && bgHue > 300 ) lightBg = false // TODO: adjust this condition based on the project's colors to ensure proper contrast between all FAQ background colors and text colors

    return (
      <div className={classes} style={styles}>
        <FaqAccordions
          faqs={faqsData}
          title={title || "FAQs"}
          lightBg={lightBg}
        />
      </div>
    )
}
