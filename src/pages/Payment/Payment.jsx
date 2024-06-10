import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChecoutFrom from './ChecoutFrom';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);
const Payment = () => {
  const { id } = useParams();
  console.log(id);
  let price = '';
  if (id === 'Silver') {
    price = 49;
  } else if (id === 'Gold') {
    price = 199;
  } else if (id === 'Platinum') {
    price = 399;
  }
  return (
    <div>
      <div className="h-72 w-full bg-pClr"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center pt-12 pb-4">
          Pay for the {id} Plan
        </h1>
        <div className="max-w-[550px] mx-auto pt-10 px-3 rounded-md border-slate-400 border-2 mb-10">
          <Elements stripe={stripePromise} className="">
            <ChecoutFrom price={price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
