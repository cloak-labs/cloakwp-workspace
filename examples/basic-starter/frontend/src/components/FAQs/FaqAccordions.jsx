import { Disclosure } from "@headlessui/react";
import { Container } from "@/components/Layout";
import { HeroIcon } from "@/components/Icons";
import classNames from "@/utils/classNames";

export function FaqAccordions({title = "Frequently asked questions", faqs, lightBg = true, className}) {
  if(!faqs || !faqs.length) return <></>

  const questionColor = lightBg ? 'text-blue-800' : 'text-gray-300';
  const answerColor = lightBg ? 'text-blue-800' : 'text-blue-500';
  const dividerColor = lightBg ? 'divide-blue-900/20' : 'divide-white/50';

  return (
    <Container className={className}>
      <div className={classNames("mx-auto max-w-3xl divide-y", dividerColor)}>
        {title && <h2 className={classNames("text-center md:mb-2", questionColor)}>{title}</h2>}
        <dl className={classNames("mt-6 space-y-6 divide-y", dividerColor)}>
          {faqs.map(({question, answer, id}, index) => (
            <Disclosure as="div" key={`${index}_${id || question}`} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-600">
                      <span className={classNames("font-medium", questionColor)}>{question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <HeroIcon
                          icon="chevron-down"
                          className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform transition-transform')}
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <span className={classNames("text-base", answerColor)}>{answer}</span>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </Container>
  )
}