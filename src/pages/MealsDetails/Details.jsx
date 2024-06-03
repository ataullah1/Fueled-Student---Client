import { useParams } from 'react-router-dom';

const Details = () => {
  const id = useParams();
  console.log('Details Id:', id);
  return <div></div>;
};

export default Details;
