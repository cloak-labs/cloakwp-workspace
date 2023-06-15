import Blocks from './Blocks';
import { useGlobalConfig } from './hooks/useGlobalConfig';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function BlockPreviewPage({ blockData }) {
  console.log({ blockData });

  const router = useRouter();

  const sendHeightToParent = () => {
    setTimeout(() => {
      // Get the content height and send it to the parent website
      console.log('send height to parent, documentElement: ', document.documentElement)
      const contentHeight = document.querySelector('#previewBlock').clientHeight;
      window.parent?.postMessage(contentHeight, '*');
    }, 500)
  };

  // when parent sends message, handleIframeMessage() handles it
  const handleIframeMessage = function (event) {
    console.log('received message event in iframe: ', event);
    // Check if the message is requesting the content height
    if (event.data === 'getHeight') {
      console.log('message is requesting our iframe content height');
      sendHeightToParent();
    } 
  };

  function handleRouteChangeStart(url) {
    throw new Error('Abort route change while previewing block');
  }

  useEffect(() => {
    if (typeof window !== 'undefined') { // prevents running the following client code on server
      console.log('initial render of block preview')
      // don't wait for parent to ask for iframe height, just send it (only on initial render)
      sendHeightToParent();

      // Add a message event listener to receive messages from the parent website (i.e. WordPress Gutenberg Editor)
      window.addEventListener('message', handleIframeMessage);

      // Disable page transitions so that clicking links in iframe preview doesn't navigate editor away from preview route
      router.events.on('routeChangeStart', handleRouteChangeStart);

      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener('message', handleIframeMessage);
        router.events.off('routeChangeStart', handleRouteChangeStart);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`Preview Block: ${blockData.blockName}`}</title>
      </Head>
      <div id="previewBlock">
        <Blocks data={[blockData]} blocks={{}} container={{}} />
      </div>
    </>
  );
}

export function getServerSideProps(ctx) {
  const {
    query: { blockData = null, secret = null },
  } = ctx;

  const config = useGlobalConfig();

  if (!blockData || secret != config.sources.default.secret) {
    // if someone visits this route without passing blockData or the correct secret, we redirect them to the homepage
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // TODO: do I need to run decodeURI() on blockData?
  let data = JSON.parse(blockData);

  return {
    props: {
      blockData: data,
      enableLayout: false
    },
  };
}