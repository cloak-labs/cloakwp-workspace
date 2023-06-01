import { useScrollYPosition } from 'react-use-scroll-position';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from '@/utils/classNames';
import { Popover } from '@headlessui/react';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { Container } from '@/components/Layout';
import { Logo } from '@/components/Logo';
import { NavLinks } from '@/components/Layout';
import { HeroIcon } from '@/components/Icons';


function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-blue-800 md:text-lg hover:text-gray-500 hover:bg-gray-100/50 p-4 rounded-xl text-center"
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

export function Header( { navBarData }) {
  const scrollY = useScrollYPosition();
  const [isAtTop, setIsAtTop] = useState(scrollY == 0);
  
  useEffect(() => {
    if(scrollY == 0) setIsAtTop(true)
    else if(isAtTop == true) setIsAtTop(false) // this condition is a huge performance boost (I think) -- ensures we don't reset state on every scroll pixel change
  }, [scrollY])
  
  return (
    <motion.header initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1, duration: 1.2}} className={classNames(
      'fixed top-0 z-50 w-full transition-all ease-in-out',
      isAtTop ? 'bg-white shadow-none' : 'bg-gray-100/90 shadow-xl shadow-gray-900/5 backdrop-blur-sm'
    )}>
      <nav className=''>
        <Container className="relative z-50 justify-between px-0 sm:px-0 md:px-0 xmd:px-4">
          <div className="relative z-10 flex w-full items-center py-4 xmd:gap-5 lg:gap-12 xl:gap-x-20">
            <Link href="/" aria-label="Home" className='z-50 pl-4 mr-auto flex-grow-0 xmd:pl-0'>
              <Logo />
            </Link>
            <div className="hidden xmd:justify-center xmd:flex-grow xmd:flex xmd:gap-x-10 xl:gap-x-16 2xl:gap-x-20">
              <NavLinks links={navBarData.slice(0,-1)}/>
            </div>

            {/* Mobile Menu */}
            <Popover className="flex justify-end xmd:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg text-gray-800 p-2 pr-4 xmd:pr-0 hover:text-blue-900 active:text-blue-700 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <HeroIcon icon="chevron-up" className="w-6 h-6" />
                        ) : (
                        <HeroIcon icon="bars-2" className="w-6 h-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-100/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 px-6 pt-24 pb-6 origin-top shadow-2xl rounded-b-2xl bg-gray-50 shadow-gray-900/20"
                        >
                          <div className="space-y-2 mb-4">
                            {navBarData.map(({title, url}, index) => {
                                if(index != navBarData.length-1) {
                                  return <MobileNavLink key={index} href={url}>{title}</MobileNavLink>
                              }
                            })}
                          </div>

                          <div className="flex justify-center">
                            <Popover.Button as={Button} href={navBarData[navBarData.length-1].url}>{navBarData[navBarData.length-1].title}</Popover.Button>
                          </div>

                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {/* END Mobile Menu */}

            <Button href={navBarData[navBarData.length-1].url} className="hidden xmd:block">
              {navBarData[navBarData.length-1].title}
            </Button>
          </div>
        </Container>
      </nav>
    </motion.header>
  )
}
