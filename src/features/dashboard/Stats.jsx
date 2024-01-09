import { HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineBanknotes, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const occupation = Math.round((confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount)) * 100);
  return (
    <>
      <Stat title="Bookings" color="blue" value={numBookings} icon={<HiOutlineBriefcase />} />
      <Stat title="Sales" color="green" value={formatCurrency(sales)} icon={<HiOutlineBanknotes />} />
      <Stat title="Check ins" color="indigo" value={confirmedStays.length} icon={<HiOutlineCalendarDays />} />
      <Stat title="Occupancy rate" color="yellow" value={`${occupation}%`} icon={<HiOutlineChartBar />} />
    </>
  );
}

export default Stats;
