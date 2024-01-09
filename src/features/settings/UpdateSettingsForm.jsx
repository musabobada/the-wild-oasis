import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfasePrice } = {}, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  function handleUpdate(e) {
    const { name, value } = e.target;
    if (!value) return;
    const newSetting = { [name]: value };
    updateSetting(newSetting);
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking" type="number" name="minBookingLength" disabled={isUpdating} defaultValue={minBookingLength} extraProps={{ onBlur: (e) => handleUpdate(e) }} />
      <FormRow label="Maximum nights/booking" type="number" name="maxBookingLength" disabled={isUpdating} defaultValue={maxBookingLength} extraProps={{ onBlur: (e) => handleUpdate(e) }} />
      <FormRow label="Maximum guests/booking" type="number" name="maxGuestsPerBooking" disabled={isUpdating} defaultValue={maxGuestsPerBooking} extraProps={{ onBlur: (e) => handleUpdate(e) }} />
      <FormRow label="Breakfast price" type="number" name="breakfasePrice" disabled={isUpdating} defaultValue={breakfasePrice} extraProps={{ onBlur: (e) => handleUpdate(e) }} />
    </Form>
  );
}

export default UpdateSettingsForm;
