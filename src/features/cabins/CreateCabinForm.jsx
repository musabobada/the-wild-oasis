import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormRow, { StyledFormRow } from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isEditing, createCabin } = useCreateCabin();
  const { isCreating, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEdit ? editValues : {} });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => { reset(); onCloseModal?.() },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => { reset(); onCloseModal?.() }
        }
      );
    }
  }
  function onError(error) {
    let arr = [];
    for (let key in error) {
      arr.push(key + " : " + error[key].message);
    }
    toast.error("invaild input fields");
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow disabled={isWorking} label="Cabin Name" name="name" type="text" errors={errors} register={{ ...register("name", { required: "this field is required" }) }} />
      <FormRow
        disabled={isWorking}
        label="Maximum capacity"
        name="maxCapacity"
        type="number"
        errors={errors}
        register={{ ...register("maxCapacity", { required: "this field is required", min: { value: 1, message: "capcity should be at least 1" } }) }}
      />
      <FormRow
        disabled={isWorking}
        label="Regular price"
        name="regularPrice"
        type="number"
        errors={errors}
        register={{ ...register("regularPrice", { required: "this field is required", min: { value: 1, message: "price should be at least 1" } }) }}
      />
      <FormRow
        disabled={isWorking}
        label="Discount"
        name="discount"
        type="number"
        errors={errors}
        extraProps={{ defaultValue: 0 }}
        register={{
          ...register("discount", {
            required: "this field is required",
            min: { value: 0, message: "discount should't be minus" },
            validate: (value) => value <= +getValues().regularPrice || "discount should be less than reqular price",
          }),
        }}
      />

      <FormRow
        disabled={isWorking}
        label="Description for website"
        name="description"
        type="textarea"
        errors={errors}
        register={{ ...register("description", { required: "this field is required" }) }}
      />
      <FormRow disabled={isWorking} label="Cabin photo" name="image" errors={errors} register={{ ...register("image", { required: isEdit ? false : "this field is required" }) }} />

      <StyledFormRow>
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "creating..." : isEdit ? "Edit Cabin" : "Add Cabin"}</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
