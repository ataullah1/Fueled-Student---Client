const RequestedMeals = () => {
  return (
    <div>
      {/* table part */}
      <div className="w-11/12 mx-auto">
        {/* Table Part */}
        <div className="w-full mx-auto pt-10">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border rounded-md">
              <thead>
                <tr className="rounded-md font-semibold">
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    <span className="flex items-center gap-16">
                      <span>Image</span>
                      <span>Name</span>
                    </span>
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Description
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Ingredients
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    Action
                  </th>
                </tr>
              </thead>

              {isLoading ? (
                <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl ">
                  <ImSpinner3 className="animate-spin" />
                </div>
              ) : (
                <tbody className="text-white">
                  {my_order.map((dta) => (
                    <tr>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-24 h-20">
                            <img
                              className="w-24 h-20 rounded-md"
                              src={dta?.food_image}
                              alt=""
                            />
                          </div>

                          <div className="ml-4 w-44">
                            <div className="text-sm font-medium leading-5 ">
                              {dta?.food_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <p>
                            {dta?.food_description.slice(0, 32)}
                            {dta?.food_description.length > 32 && '...'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <p>{dta?.food_ingredients}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={
                              dta.status === 'panding'
                                ? 'h-3 w-3 rounded-full bg-[#F97316]'
                                : dta.status === 'processing'
                                ? 'h-3 w-3 rounded-full bg-yellow-400'
                                : 'h-3 w-3 rounded-full bg-[#10B981]'
                            }
                          ></div>
                          {dta?.status}
                        </div>
                      </td>

                      <td className="text-center border-b border-gray-200">
                        <button
                          onClick={() => handleDelete(dta._id)}
                          className="text-2xl text-red-500 hover:scale-125 duration-300"
                        >
                          <FaTrashAlt />
                        </button>
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
  );
};

export default RequestedMeals;
