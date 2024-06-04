import { Rating } from '@smastrom/react-rating';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';

export default function AddReview() {
  const [rating, setRating] = useState(0);

  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const handleClearFile = () => {
    setShowName('');
    setShowImagePreview('');
    fileInputRef.current.value = '';
  };

  console.log(showName);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (rating < 1) {
      Swal.fire({
        title: 'Please give your rating',
        icon: 'warning',
        timer: 1500,
      });
      return;
    }
    console.log(data);
    reset();
    setRating(0);
  };
  console.log(errors);
  return (
    <div>
      <h3 className="mb-2 font-semibold text-xl">
        Add Photo{' '}
        <span className="text-slate-300 font-normal text-sm">
          (You can skip it if you want)
        </span>
      </h3>
      <div>
        <div className="text-slate-100">
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
              className=" mx-auto flex w-full flex-col items-center justify-center space-y-1 rounded-lg border-2 border-dashed border-gray-400 p-3 bg-transparent"
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
      <div className="py-6 flex justify-center items-center gap-3">
        <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
        <span className="text-2xl">({rating ? rating : 0}/5)</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea
          className={`w-full bg-transparent border rounded-md p-3 min-h-40 shadow-md shadow-slate-400 border-slate-500`}
          placeholder="Enter Your Opinion..."
          {...register('YourOpinion', { required: true, minLength: 30 })}
        />
        {errors.YourOpinion?.type === 'required' && (
          <p className="text-red-500 py-2">Please Input Your Your Opinion!</p>
        )}
        {errors.YourOpinion?.type === 'minLength' && (
          <p className="text-red-500 py-2">
            Please Input Your Your Opinion Minimum 20 Character!
          </p>
        )}
        <input
          type="submit"
          value={'Save Review'}
          className="py-2 px-10 mx-auto block hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer rounded-md bg-pClr text-slate-100 font-semibold mt-3"
        />
      </form>
    </div>
  );
}
