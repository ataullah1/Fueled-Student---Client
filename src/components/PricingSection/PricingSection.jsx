import { MdDone } from 'react-icons/md';

const PricingSection = () => {
  return (
    <section
      className="py-12"
      style={{
        background:
          'radial-gradient(circle, rgba(86,28,134,0.3841911764705882) 18%, rgba(30,41,59,1) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-purple-200">
            You unlock your service as per your requirement
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="hover:bg-white hover:bg-opacity-10 hover:scale-110 duration-300 rounded-lg shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 m-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Silver
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">Basic Pack</h3>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$49</span>
              <span className="text-xl font-medium text-purple-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-purple-200 h-36">
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Limited number of food orders per month</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Access to basic hostel services</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Basic customer support</span>
              </li>
            </ul>
            <button className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Purchase Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="hover:bg-white hover:bg-opacity-10 hover:scale-110 duration-300 rounded-lg shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 m-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-green-800">
                Gold
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white capitalize">
                Standard Pack
              </h3>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$199</span>
              <span className="text-xl font-medium text-purple-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-purple-200 h-36">
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>More food orders per month</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Access to advanced hostel services</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Priority customer support</span>
              </li>
            </ul>
            <button className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
              Purchase Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="hover:bg-white hover:bg-opacity-10 hover:scale-110 duration-300 rounded-lg shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 m-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-yellow-800">
                Platinum
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Premium Pack
              </h3>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$399</span>
              <span className="text-xl font-medium text-purple-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-purple-200 h-36">
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Unlimited food orders</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Access to all hostel servicess</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span>Premium customer support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 text-2xl pr-2">
                  <MdDone />
                </span>
                <span> laundry service, gym access</span>
              </li>
            </ul>
            <a
              href="#"
              className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              Purchase Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
