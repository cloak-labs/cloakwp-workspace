import Image from 'next/future/image';
import { Link } from '@/components/Link';
import { Container } from '@/components/Layout';
import { metaConfig } from '@/config/metaConfig';
import { Logo } from '@/components/Logo';
import { Facebook, Instagram, Twitter } from '@/components/Icons/Social';

const content = {
    social: [
      {
        Icon: Facebook,
        href: metaConfig.links.social.facebook
      },
      {
        Icon: Instagram,
        href: metaConfig.links.social.instagram
      },
      {
        Icon: Twitter,
        href: metaConfig.links.social.twitter
      },
    ],
    copyright: `${new Date().getFullYear()} ${metaConfig.companyName}. All rights reserved.`
}

export function Footer({ navBarData }) {
  return (
    <footer className='bg-gray-900 text-blue-200 py-14'>
      <Container>
        <div className='flex flex-col items-center justify-center my-4 px-6'>
          <div>
            <Link href='/'>
              <Logo dark={false} />
              {/* <Image width={225} height={70} src="/images/footer_logo.png" className="w-48" quality={100} /> */}
            </Link>
          </div>
          <div className='flex-col text-center sm:flex-row flex flex-wrap justify-center gap-x-10 gap-y-3 my-10'>
            {navBarData.slice(0,-1).map(( {title, url}, index ) => (
              <Link href={url} key={index}>
                <p className='uppercase text-base'>
                  {title}
                </p>
              </Link>
            ))}
          </div>
          <div className='flex justify-between gap-6 mt-2'>
            {
              content.social.map( ({Icon, href}, index) => (
                <Link href={href} key={index}>
                  <Icon className="text-blue-200" />
                  {/* <Image width={25} height={25} src={icon} className='w-7 h-7'/> */}
                </Link>
              ))
            }
          </div>
          <p className='mt-6 text-sm text-center'>
            &copy; {content.copyright}
          </p>
        </div>
      </Container>
    </footer>
  )
}
