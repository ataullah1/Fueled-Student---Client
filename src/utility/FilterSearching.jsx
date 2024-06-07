import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: { str: 0, end: 5 }, label: '$00.00 - $05.00' },
  { value: { str: 5, end: 10 }, label: '$05.00 - $10.00' },
  { value: { str: 10, end: 15 }, label: '$10.00 - $15.00' },
  { value: { str: 15, end: 20 }, label: '$15.00 - $20.00' },
];

export default function FilterSearching({ handleFilter }) {
  const [selectedOption, setSelectedOption] = useState(null);
  // console.log(selectedOption?.value);
  handleFilter(selectedOption?.value);
  return (
    <div className="w-full md:w-80 max-w-full md:max-w-80">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Search by filter"
      />
    </div>
  );
}
FilterSearching.propTypes = {
  handleFilter: PropTypes.func,
};
