import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import useAxiosSec from '../../Hooks/useAxiosSec';

const ChecoutFrom = ({ price }) => {
  const axiosSec = useAxiosSec();
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  console.log(price);
  useEffect(() => {
    axiosSec.post('/create-payment-intent', { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSec, price]);

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setErr(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setErr('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="text-center">
      <CardElement
        className="font-semibold"
        options={{
          style: {
            base: {
              fontSize: '22px',
              color: '#fff',
              '::placeholder': {
                color: '#e2e8f0',
              },
            },
            invalid: {
              color: '#ef4444',
            },
          },
        }}
      />
      <button
        className="bg-pClr px-5 py-2 rounded-md font-bold text-white mt-14 mx-auto "
        type="submit"
        disabled={!stripe}
      >
        Pay Now
      </button>
      <p className="pt-7 pb-4 text-red-400">{err}</p>
    </form>
  );
};

export default ChecoutFrom;
ChecoutFrom.propTypes = {
  price: PropTypes.number,
};
