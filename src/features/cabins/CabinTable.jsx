import useCabins from "./UseCabins";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get("discount") || "all"

  let filteredCabins
  if (filterValue === "all") filteredCabins = cabins
  if (filterValue === "no-discount") filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
  if (filterValue === "with-discount") filteredCabins = cabins?.filter(cabin => cabin.discount > 0)

  const sortBy = searchParams.get("sortBy") || "startDate-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabin = filteredCabins?.sort((a, b) => {
    if (field === "name") {
      return (a[field].localeCompare(b[field])) * modifier
    }
    else {
      return (a[field] - b[field]) * modifier
    }
  })

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin, i) => (<CabinRow key={i} cabin={cabin} />)}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
