import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";

import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { updateUser, isloading } = useUpdateUser();
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { handleSubmit, register, reset } = useForm();

  function onSubmit({ fullName, avatar }) {
    if (!fullName) return;
    updateUser({ fullName, avatar: avatar[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow name="email" type="text" label="Email address" disabled defaultValue={email} />
      <FormRow name="fullName" type="text" label="Full name" defaultValue={currentFullName} disabled={isloading} id="fullName" register={{ ...register("fullName") }} />
      <FormRow name="avatar" type="file" label="Avatar image" accept="image/*" disabled={isloading} register={{ ...register("avatar") }} />
      <StyledFormRow>
        <Button type="reset" variation="secondary" onClick={reset} disabled={isloading}>
          Cancel
        </Button>
        <Button disabled={isloading}>Update account</Button>
      </StyledFormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
