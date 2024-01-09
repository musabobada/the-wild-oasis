import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        name="password"
        type="password"
        label="Password (min 8 characters)"
        errors={errors}
        autoComplete="current-password"
        disabled={isUpdating}
        register={{
          ...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          }),
        }}
      />

      <FormRow
        name="passwordConfirm"
        type="password"
        label="Confirm password"
        errors={errors}
        autoComplete="new-password"
        disabled={isUpdating}
        register={{
          ...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          }),
        }}
      />
      <StyledFormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </StyledFormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
