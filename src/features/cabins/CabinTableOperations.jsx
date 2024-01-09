import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {

  const filterOptions = [
    { label: "All", value: "all", },
    { label: "No Discount", value: "no-discount", },
    { label: "With Discount", value: "with-discount", },
  ]
  const sortOptions = [
    { value: "name-asc", label: "Sort by name (A-Z)" },
    { value: "name-desc", label: "Sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by price (low first)" },
    { value: "regularPrice-desc", label: "Sort by price (high first)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
    { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
  ]

  return (
    <TableOperations>
      <Filter field="discount" options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
