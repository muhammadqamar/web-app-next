import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
export default function PreviewPage() {
  const router = useRouter();
  const { success, canceled } = router.query;
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log('Order placed! You will receive an email confirmation.');
      }

      if (canceled) {
        console.log(
          'Order canceled -- continue to shop around and checkout when you’re ready.'
        );
      }
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <div>
          <Image
            src={
              'https://stripe-camo.global.ssl.fastly.net/6e7ca6d126a87ca2d30c3fd6c61cf5c514a3349906af40d230503d4f88a77359/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387854546b32553035434d324e4c536d316b646a4a6966475a735833526c6333526655565a3054323543636e55774d4578575932394d61544e305a476c3153555231303039464e744e537257'
            }
            width={200}
            height={200}
          />
          {/* <img
            width={'250px'}
            height={'250px'}
            src="images/cta-2.jpg"
            alt="#"
          /> */}
          <div>
            <p>$1200</p>
          </div>
        </div>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
