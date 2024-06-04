import { useForm } from 'react-hook-form';

export default function AddReview() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('Your Opinion', { required: true })} />

      <input type="submit" />
    </form>
  );
}
