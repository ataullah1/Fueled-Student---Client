import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import usePayment from '../../../Hooks/usePayment';

const PaymentHistory = () => {
  const { userDta } = useAuth();
  const axiosSec = useAxiosSec();
  const isPay = usePayment();
  const { data: ddaata = [] } = useQuery({
    queryKey: ['payment', userDta.email],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/paymentss/${userDta.email}`);
      // console.log(data);
      return data;
    },
  });
  const data = ddaata[0];
  console.log(data);
  if (!isPay) {
    return (
      <div className="text-slate-800 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto">
        <h1>You have not Payment any meals yet!</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="border border-slate-400 rounded-md min-h-8 mt-11">
        <table>
          <tr>
            <td className="min-w-80 py-4 px-4">Payment Name: </td>
            <td className="min-w-80 py-4 px-4">{data?.name}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Payment email: </td>
            <td className="min-w-80 py-4 px-4">{data?.email}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Payment ammount: </td>
            <td className="min-w-80 py-4 px-4">{data?.ammount}</td>
          </tr>

          <tr>
            <td className="min-w-80 py-4 px-4">Payment transactionId: </td>
            <td className="min-w-80 py-4 px-4">{data?.transactionId}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Your badge: </td>
            <td className="min-w-80 py-4 px-4">{data?.badge}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
