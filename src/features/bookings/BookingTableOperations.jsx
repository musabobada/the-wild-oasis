import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'checked-out', label: 'Checked out' },
    { value: 'checked-in', label: 'Checked in' },
    { value: 'unconfirmed', label: 'Unconfirmed' },
  ]
  const sortOptions = [
    // { value: 'name-asc', label: 'Sort by name (A - Z)' },
    // { value: 'name-desc', label: 'Sort by name (Z - A)' },
    { value: 'startDate-desc', label: 'Sort by date (recent first)' },
    { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
    {
      value: 'totalPrice-desc',
      label: 'Sort by amount (high first)',
    },
    { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
  ]
  return (
    <TableOperations>
      <Filter
        field='status'
        options={filterOptions}
      />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
