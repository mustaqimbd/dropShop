import FilterByRating, {
  FilterByCheckbox,
  FiltereByPrice,
} from "../../../components/filtered/FiltereBy";

const FilteredSidebar = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Add more options as needed
  ];

  return (
    <>
      <div className="h-screen space-y-3 w-full ">
        <FiltereByPrice />
        <FilterByRating />
        <FilterByCheckbox title={"Filtered By Brand"} options={options} />
      </div>
    </>
  );
};

export default FilteredSidebar;
