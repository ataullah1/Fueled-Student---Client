import { useMutation, useQuery } from '@tanstack/react-query';
import { ImSpinner3 } from 'react-icons/im';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import toast from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';
import ServeMealFilter from '../../../utility/ServeMealFilter';

const ServeMeals = () => {
  const axioss = useAxiosSec();
  const [viewBtn, setViewBtn] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, handleFilter] = useState('');
  // console.log(filter);
  const toggle = (id) => {
    if (viewBtn === id) {
      setViewBtn(null);
    } else {
      setViewBtn(id);
    }
  };
  const {
    data: request = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['request', search, filter],
    queryFn: async () => {
      const { data } = await axioss.get(
        `/request?search=${search}&filter=${filter}`
      );
      return data;
    },
  });
  console.log(request);

  const { mutateAsync: update } = useMutation({
    mutationFn: async (statusDta) => {
      console.log(statusDta[0], statusDta[1]);
      const { data } = await axioss.patch(
        `/request-meals-status-update?status=${statusDta[1]}&id=${statusDta[0]}`
      );
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      console.log('Updated Order Status');
    },
  });
  //  handle status update ==========
  const handleStatus = async (id, statusDta) => {
    setViewBtn(null);
    console.log(id, statusDta);
    await update([id, statusDta]);
  };

  //  Delete Order======
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axioss.delete(`/request-delete/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success('Removed Request');
      console.log('Deleted Order');
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({ id });
      }
    });
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  return (
    <div className="p-5">
      <h1 className="pt-3 pb-5 text-3xl text-slate-700 font-bold">
        Today Orders
      </h1>

      <div className="w-full flex flex-col gap-2 md:gap-4 md:flex-row items-center justify-between pb-4">
        <div className="w-full md:w-auto">
          <ServeMealFilter handleFilter={handleFilter} />
        </div>
        <div className="w-full md:w-auto">
          <form
            onSubmit={handleSearchClick}
            className="w-full md:w-auto relative"
          >
            <input
              onChange={handleSearch}
              type="text"
              name="search"
              placeholder="Search username or email"
              className="rounded px-4 py-[7px] w-full md:w-80 max-w-full md:max-w-80 text-slate-600 focus:outline-none pr-20 border border-slate-400"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-2 rounded-md bg-pClr text-slate-50 px-2 font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-3 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <div className="flex flex-col gap-5">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 ">
                      <span className="flex items-center gap-7">
                        <span>Meals Image</span>
                        <span>Meals Title</span>
                      </span>
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      User Name
                    </th>

                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      User Email
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>

                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Action
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan={5} className="">
                        <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl mx-auto">
                          <ImSpinner3 className="animate-spin" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : request?.length < 1 ? (
                  <tbody>
                    <tr>
                      <td colSpan={6} className="">
                        <div className="text-slate-800 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto">
                          <h1>
                            No meal requests were found according to your
                            search!
                          </h1>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="bg-white">
                    {request.map((dta) => (
                      <tr key={dta._id}>
                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-24 h-20">
                              <img
                                className="w-24 h-20 rounded-md"
                                src={
                                  dta?.recMealImg ||
                                  'https://i.ibb.co/PwXW3g8/sdfsaf.jpg'
                                }
                                alt=""
                              />
                            </div>

                            <div className="ml-4 min-w-44">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {dta?.recMealTitle ||
                                  'amr soner bangla ami tomay'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 text-center py-4 whitespace-no-wrap border-b border-gray-200 min-w-32">
                          <div className="text-sm leading-5 text-gray-900">
                            {dta?.recName}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {dta?.recEmail}
                          </div>
                        </td>

                        <td className="px-3 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center gap-2 justify-center capitalize">
                            <div
                              className={
                                dta.status === 'pending'
                                  ? 'h-3 w-3 rounded-full bg-[#F97316]'
                                  : dta.status === 'processing'
                                  ? 'h-3 w-3 rounded-full bg-yellow-400'
                                  : 'h-3 w-3 rounded-full bg-[#10B981]'
                              }
                            ></div>
                            {dta?.status}
                          </div>
                        </td>

                        <td className="px-3 text-center relative py-4 text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                          <button
                            onClick={() => toggle(dta._id)}
                            className={`text-xl text-indigo-600 hover:text-indigo-900`}
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {viewBtn === dta._id && (
                            <div className="absolute z-20 top-[65px] right-[50px] w-36 border border-stone-600 rounded-md p-1 bg-white capitalize">
                              <div
                                className="size-7 rounded-full -translate-x-9 border-slate-600 border-2 flex justify-center items-center text-xl absolute hover:text-red-500"
                                onClick={() => toggle(dta._id)}
                              >
                                <CgClose />
                              </div>
                              {dta.status !== 'pending' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'pending')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Pendding
                                </button>
                              )}
                              {dta.status !== 'processing' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'processing')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Processing
                                </button>
                              )}
                              {dta.status !== 'served' && (
                                <button
                                  onClick={() =>
                                    handleStatus(dta._id, 'served')
                                  }
                                  className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                                >
                                  Served
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(dta._id)}
                                className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md bg-red-500 text-white mt-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServeMeals;
