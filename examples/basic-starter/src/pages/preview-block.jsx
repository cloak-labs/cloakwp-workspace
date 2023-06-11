import { Blocks, useGlobalConfig } from 'cloakwp';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Test out page by visiting:
//    - imageCta block preview: http://localhost:5000/preview-block?secret={WP_SECRET_1}&blockData=%7B%22blockName%22%3A%22acf%5C%2Fimagecta%22%2C%22attrs%22%3A%7B%22align%22%3A%22%22%2C%22style%22%3A%5B%5D%2C%22data%22%3A%7B%22h4%22%3A%22Work+for+Us%22%2C%22body%22%3A%22We+keep+our+painting+crews+busy+and+we+are+always+looking+for+new+people+to+join+our+expanding+team+of+skilled+painters+in+Vancouver+and+the+Lower+Mainland.%5Cr%5Cn%5Cr%5CnIf+you+are+interested+in+being+part+of+a+growing+company+and+believe+you%27re+a+good+candidate%2C+we+would+love+to+hear+from+you.%22%2C%22button%22%3A%7B%22title%22%3A%22Apply+Today%22%2C%22url%22%3A%22%5C%2Fwork-for-us%22%2C%22target%22%3A%22%22%7D%2C%22bg_image%22%3A%7B%22src%22%3A%22http%3A%5C%2F%5C%2F23.29.145.150%5C%2F%7Evanguard%5C%2Fwp-content%5C%2Fuploads%5C%2F2022%5C%2F12%5C%2Fclaudio-schwarz-B5Uxl-QEGOE-unsplash.jpg%22%2C%22alt%22%3A%22Industrial+building+stock+photo%22%2C%22width%22%3A1920%2C%22height%22%3A1281%2C%22is_resized%22%3Afalse%7D%7D%2C%22name%22%3A%22%22%2C%22_bg_image%22%3A%5B%5D%2C%22mode%22%3A%22%22%2C%22lock%22%3A%5B%5D%2C%22className%22%3A%22%22%7D%2C%22rendered%22%3A%22%22%7D
//    - reviewCarousel block preview: http://localhost:5000/preview-block?secret={WP_SECRET_1}&blockData=%7B%22blockName%22%3A%22acf%5C%2Freviewcarousel%22%2C%22attrs%22%3A%7B%22align%22%3A%22%22%2C%22style%22%3A%5B%5D%2C%22data%22%3A%7B%22data_type%22%3A%220%22%2C%22review_posts%22%3A%7B%22ID%22%3A166%2C%22key%22%3A%22field_638e619b28519%22%2C%22label%22%3A%22Reviews%22%2C%22name%22%3A%22review_posts%22%2C%22aria-label%22%3A%22%22%2C%22prefix%22%3A%22acf%22%2C%22type%22%3A%22relationship%22%2C%22value%22%3A%5B%7B%22ID%22%3A233%2C%22post_author%22%3A%221%22%2C%22post_date%22%3A%222022-12-07+23%3A14%3A29%22%2C%22post_date_gmt%22%3A%222022-12-07+23%3A14%3A29%22%2C%22post_content%22%3A%22%3C%21--+wp%3Aparagraph+--%3E%5Cn%3Cp%3EWe+recently+contracted+Vanguard+to+paint+our+interior+offices+and+production+facility+and+are+extremely+pleased+with+the+results.+As+a+marketing+services+company%2C+it+was+critical+that+the+finished+product+look+spotless.+Vanguard+helped+us+choose+the+right+paint+for+the+job+in+order+to+get+the+look+we+wanted+and+stay+on+budget.+They+also+made+suggestions+along+the+way+and+were+very+flexible+in+accommodating+our+requests.+I+would+highly+recommend+Vanguard+Painting.+Quentin+and+his+crew+are+not+only+professional+%5Cu2013+they%5Cu2019re+great+guys+who+cleaned+up+at+the+end+of+each+day%2C+were+always+polite%2C+and+completed+the+work+on+time.%3C%5C%2Fp%3E%5Cn%3C%21--+%5C%2Fwp%3Aparagraph+--%3E%22%2C%22post_title%22%3A%22Jag+Sangha%22%2C%22post_excerpt%22%3A%22%22%2C%22post_status%22%3A%22publish%22%2C%22comment_status%22%3A%22closed%22%2C%22ping_status%22%3A%22closed%22%2C%22post_password%22%3A%22%22%2C%22post_name%22%3A%22jag-sangha%22%2C%22to_ping%22%3A%22%22%2C%22pinged%22%3A%22%22%2C%22post_modified%22%3A%222022-12-07+23%3A14%3A30%22%2C%22post_modified_gmt%22%3A%222022-12-07+23%3A14%3A30%22%2C%22post_content_filtered%22%3A%22%22%2C%22post_parent%22%3A0%2C%22guid%22%3A%22http%3A%5C%2F%5C%2F23.29.145.150%5C%2F%7Evanguard%5C%2F%3Fpost_type%3Dreview-posts%26%23038%3Bp%3D233%22%2C%22menu_order%22%3A0%2C%22post_type%22%3A%22review-posts%22%2C%22post_mime_type%22%3A%22%22%2C%22comment_count%22%3A%220%22%2C%22filter%22%3A%22raw%22%2C%22featured_image%22%3Afalse%2C%22acf%22%3A%7B%22position%22%3A%22VP+of+Operations%22%2C%22company%22%3A%22Kirk+Marketing%22%7D%7D%2C%7B%22ID%22%3A746%2C%22post_author%22%3A%221%22%2C%22post_date%22%3A%222023-02-14+22%3A16%3A42%22%2C%22post_date_gmt%22%3A%222023-02-14+22%3A16%3A42%22%2C%22post_content%22%3A%22%3C%21--+wp%3Aparagraph+--%3E%5Cn%3Cp%3EI+have+had+the+pleasure+of+knowing+Vanguard+Painting+for+several+years%5Cu2026+I+feel+very+confident+in+recommending+Vanguard+Painting+for+any+job%2C+big+or+small%2C+in+new+construction+or+repainting%2C+interior+or+exterior.+Quentin%2C+Michael%2C+Josh+and+all+the+crews+are+true+professionals%5Cu2026+They+follow+proper+painting+practices.+They+look+for+good+technical+recommendations+and+follow+through+on+them.+Vanguard+crews+are+much+more+experienced+and+trained+then+most+crews+I+have+seen.+On+a+personal+note+they+are+honest+and+genuine%2C+and+are+great+to+work+with.%3C%5C%2Fp%3E%5Cn%3C%21--+%5C%2Fwp%3Aparagraph+--%3E%22%2C%22post_title%22%3A%22Greg+Bertram%22%2C%22post_excerpt%22%3A%22%22%2C%22post_status%22%3A%22publish%22%2C%22comment_status%22%3A%22closed%22%2C%22ping_status%22%3A%22closed%22%2C%22post_password%22%3A%22%22%2C%22post_name%22%3A%22greg-bertram%22%2C%22to_ping%22%3A%22%22%2C%22pinged%22%3A%22%22%2C%22post_modified%22%3A%222023-04-14+20%3A15%3A54%22%2C%22post_modified_gmt%22%3A%222023-04-14+20%3A15%3A54%22%2C%22post_content_filtered%22%3A%22%22%2C%22post_parent%22%3A0%2C%22guid%22%3A%22https%3A%5C%2F%5C%2Fvanguard-painting.vercel.app%5C%2F%3Fpost_type%3Dreview-posts%26%23038%3Bp%3D746%22%2C%22menu_order%22%3A0%2C%22post_type%22%3A%22review-posts%22%2C%22post_mime_type%22%3A%22%22%2C%22comment_count%22%3A%220%22%2C%22filter%22%3A%22raw%22%2C%22featured_image%22%3Afalse%2C%22acf%22%3A%7B%22position%22%3A%22Sales+and+Service+Representative%22%2C%22company%22%3A%22General+Paint%22%7D%7D%2C%7B%22ID%22%3A744%2C%22post_author%22%3A%221%22%2C%22post_date%22%3A%222023-02-14+22%3A14%3A45%22%2C%22post_date_gmt%22%3A%222023-02-14+22%3A14%3A45%22%2C%22post_content%22%3A%22%3C%21--+wp%3Aparagraph+--%3E%5Cn%3Cp%3EThe+British+Columbia+Transplant+Society+recently+contracted+with+Vanguard+Painting+to+repaint+our+entire+office%2C+including+patient+exam+rooms%2C+patient+waiting+room+and+patient+washrooms%5Cu2026+We+were+very+pleased+with+the+Vanguard+team.+Everyone+we+dealt+with+was+pleasant%2C+efficient+and+they+did+exactly+what+they+said+they+were+going+do%2C+when+they+said+they+would+do+it.+We+would+definitely+recommend+Vanguard+as+well+as+use+them+again+ourselves.%3C%5C%2Fp%3E%5Cn%3C%21--+%5C%2Fwp%3Aparagraph+--%3E%22%2C%22post_title%22%3A%22Bill+Barrable%22%2C%22post_excerpt%22%3A%22%22%2C%22post_status%22%3A%22publish%22%2C%22comment_status%22%3A%22closed%22%2C%22ping_status%22%3A%22closed%22%2C%22post_password%22%3A%22%22%2C%22post_name%22%3A%22bill-barrable%22%2C%22to_ping%22%3A%22%22%2C%22pinged%22%3A%22%22%2C%22post_modified%22%3A%222023-02-14+22%3A14%3A46%22%2C%22post_modified_gmt%22%3A%222023-02-14+22%3A14%3A46%22%2C%22post_content_filtered%22%3A%22%22%2C%22post_parent%22%3A0%2C%22guid%22%3A%22https%3A%5C%2F%5C%2Fvanguard-painting.vercel.app%5C%2F%3Fpost_type%3Dreview-posts%26%23038%3Bp%3D744%22%2C%22menu_order%22%3A0%2C%22post_type%22%3A%22review-posts%22%2C%22post_mime_type%22%3A%22%22%2C%22comment_count%22%3A%220%22%2C%22filter%22%3A%22raw%22%2C%22featured_image%22%3Afalse%2C%22acf%22%3A%7B%22position%22%3A%22Provincial+Executive+Director%22%2C%22company%22%3A%22+British+Columbia+Transplant+Society%22%7D%7D%5D%2C%22menu_order%22%3A3%2C%22instructions%22%3A%22Select+1+or+more+reviews+to+display+on+a+carousel+that+will+rotate+automatically%3B+users+can+also+click+to+scroll+through+each+review.%22%2C%22required%22%3A0%2C%22id%22%3A%22%22%2C%22class%22%3A%22%22%2C%22conditional_logic%22%3A%5B%5B%7B%22field%22%3A%22field_638e619b28495%22%2C%22operator%22%3A%22%21%3D%22%2C%22value%22%3A%221%22%7D%5D%5D%2C%22parent%22%3A153%2C%22wrapper%22%3A%7B%22width%22%3A%22%22%2C%22class%22%3A%22%22%2C%22id%22%3A%22%22%7D%2C%22post_type%22%3A%5B%22review-posts%22%5D%2C%22taxonomy%22%3A%22%22%2C%22filters%22%3A%5B%22search%22%5D%2C%22return_format%22%3A%22object%22%2C%22min%22%3A1%2C%22max%22%3A4%2C%22elements%22%3A%22%22%2C%22_name%22%3A%22review_posts%22%2C%22_valid%22%3A1%7D%7D%2C%22name%22%3A%22%22%2C%22hasRelationshipFields%22%3Atrue%2C%22_review_posts%22%3A%5B%5D%2C%22mode%22%3A%22%22%2C%22lock%22%3A%5B%5D%2C%22className%22%3A%22%22%7D%2C%22rendered%22%3A%22%22%7D

export default function BlockPreviewPage({ blockData }) {
  console.log({ blockData });

  const router = useRouter();

  const sendHeightToParent = () => {
    // Get the content height and send it to the parent website
    const height = document.documentElement.scrollHeight;
    window.parent?.postMessage(height, '*');
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
    if (typeof window !== 'undefined') {
      // prevents running the following client code on server
      // don't wait for parent to ask for iframe height, just send it
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
      <Blocks data={[blockData]} blocks={{}} container={{}} />
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