import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import PropTypes from 'prop-types';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import useAuth from '../../../Hooks/useAuth';

const AddMeals = () => {
  // console.log('id', id);
  const axiosSec = useAxiosSec();
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const [loding, setLoading] = useState(false);
  const { userDta } = useAuth();
  const adminName = userDta?.displayName;
  const adminEmail = userDta?.email;
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

  // console.log('Imagee==========', showName?.name);

  // Function to format the current date and time
  function getCurrentDateTimeFormatted() {
    // Create a Date object for the current date and time
    let now = new Date();

    // Get individual components
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    let day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    // Return formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  // Output formatted current date and time
  const postDate = getCurrentDateTimeFormatted();
  // console.log(time);

  // Post new review
  const { mutateAsync } = useMutation({
    mutationFn: async (meal) => {
      const { data } = await axiosSec.post('/post-meal', meal);
      console.log(data);
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Thank You',
        text: 'Your review has been successfully posted.',
        icon: 'success',
      });
    },
  });

  const handleClearFile = () => {
    setShowName('');
    setShowImagePreview('');
    fileInputRef.current.value = '';
  };

  // console.log(showName);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const description = data.description;
    const title = data.title;
    const mealType = data.mealType;
    // console.log(data);

    try {
      setLoading(true);

      const imagess = new FormData();
      imagess.append('image', showName);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        imagess
      );
      const mealImage = data.data.display_url;
      const rating = 0;
      const likes = 0;
      const meal = {
        rating,
        description,
        title,
        likes,
        mealType,
        mealImage,
        adminName,
        adminEmail,
        postDate,
      };
      // console.log('Review Datas:=====', review);
      await mutateAsync(meal);
      setLoading(false);
      setShowName('');
      setShowImagePreview('');
      fileInputRef.current.value = '';
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: 'Oops...!',
        text: `Sorry, Meal could not be Posted ! "${error.message}"`,
        icon: 'error',
      });
    }
  };
  // console.log('From Error:', errors);
  // console.log('Loding Status: ', loding);
  return (
    <div>
      <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
        Add New Meal
      </h1>
      <div className="w-full border border-slate-300 rounded-md p-4">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Meal Title */}
            <input
              type="text"
              placeholder="Enter Meal Title"
              {...register('title', { required: true, minLength: 10 })}
            />
            {errors.title?.type === 'required' && (
              <p className="text-red-500 py-2">Please Input Meal Title!</p>
            )}
            {errors.title?.type === 'minLength' && (
              <p className="text-red-500 py-2">
                Please Input Meal Title Minimum 10 Character!
              </p>
            )}

            {/* Select meals type */}
            <select {...register('mealType', { required: true })}>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </select>
            {errors.mealType?.type === 'required' && (
              <p className="text-red-500 py-2">Please Select Meal Type!</p>
            )}

            {/* Price */}
            <input
              type="number"
              placeholder="Enter Meal Price"
              {...register('price', { required: true, minLength: 1 })}
            />
            {(errors.price?.type === 'required' ||
              errors.price?.type === 'minLength') && (
              <p className="text-red-500 py-2">Please Input Meal Price!</p>
            )}
            {/*  Ingrediat */}
            <div>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Enter ingredient"
              />
              <button onClick={handleAddIngredient}>Add Ingredient</button>
              <ul>
                {ingredientsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* Description meals */}
            <textarea
              className={`w-full bg-transparent border rounded-md p-3 min-h-40 shadow-md shadow-slate-400 border-slate-500`}
              placeholder="Enter Meal Details..."
              {...register('description', { required: true, minLength: 40 })}
            />
            {errors.description?.type === 'required' && (
              <p className="text-red-500 py-2">
                Please Input Meal Description!
              </p>
            )}
            {errors.description?.type === 'minLength' && (
              <p className="text-red-500 py-2">
                Please Input Meal Description Minimum 40 Character!
              </p>
            )}
            {loding ? (
              <p className="py-2 w-44 mx-auto block duration-300 cursor-progress rounded-md bg-pClr text-slate-100 mt-3">
                <ImSpinner9 className="animate-spin text-2xl mx-auto" />
              </p>
            ) : (
              <input
                type="submit"
                value={'Save Review'}
                className="py-2 w-44 mx-auto block hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer rounded-md bg-pClr text-slate-100 font-semibold mt-3"
              />
            )}
          </form>
          <h3 className="mb-2 font-semibold text-xl">
            Add Photo
            <span className="text-slate-300 font-normal text-sm">
              (You can skip it if you want)
            </span>
          </h3>
          <div>
            <div className="text-slate-700">
              {showName?.name ? (
                <div className=" mx-auto flex w-full items-center gap-x-6  rounded-lg border-2 border-dashed border-gray-400 p-5 bg-transparent">
                  <img
                    className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                    src={showImagePreview}
                    alt={showName?.name}
                  />
                  <div className="flex-1 space-y-1.5 overflow-hidden">
                    <h5 className=" text-xl font-medium tracking-tight truncate">
                      {showName?.name}
                    </h5>
                    <p className=" text-gray-500">
                      {(showName.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <div onClick={handleClearFile}>
                    <span className="text-3xl">
                      <IoMdClose />
                    </span>
                  </div>
                </div>
              ) : (
                <label
                  className=" mx-auto flex w-full flex-col items-center justify-center space-y-1 rounded-lg border-2 border-dashed border-gray-400 p-3 bg-transparent cursor-pointer"
                  htmlFor="file5"
                >
                  <span className="text-5xl">
                    <LuUploadCloud />
                  </span>
                  <div className="space-y-1.5 text-center">
                    <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">
                      Upload your file
                    </h5>
                    <p className="text-sm text-gray-500">
                      File Should be in PNG, JPEG or JPG formate
                    </p>
                  </div>
                </label>
              )}

              <input
                ref={fileInputRef}
                onChange={(e) => {
                  if (
                    e.target.files &&
                    e.target.files[0].type.startsWith('image/') &&
                    e.target.files[0]
                  ) {
                    const imageFile = e.target.files[0];
                    setShowName(imageFile);
                    setShowImagePreview(URL.createObjectURL(imageFile));
                  } else {
                    toast.error('Only images can be uploaded!');
                  }
                }}
                className="hidden"
                accept="image/*"
                id="file5"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeals;
