import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isloading } = useSignup()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm()
  function onSubmit({ email, password, fullName }) {
    signup({ email, password, fullName }, { onSuccess: reset() })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow name="fullName" type="text" label="Full name" disabled={isloading} errors={errors} register={{ ...register("fullName", { required: "This field is required" }) }} />

      <FormRow name="email" type="email" label="Email address" disabled={isloading} errors={errors} register={{ ...register("email", { required: "This field is required", pattern: { value: /\S+@\S+\.\S+/, message: "Please Provide a valid email" } }) }} />

      <FormRow name="password" type="password" label="Password (min 8 characters)" disabled={isloading} errors={errors} register={{ ...register("password", { required: "This field is required", minLength: { value: 8, message: "Password needs a minimum of 8 characters" } }) }} />

      <FormRow name="passwordConfirm" type="password" label="Repeat password" disabled={isloading} errors={errors} register={{ ...register("passwordConfirm", { required: "This field is required", validate: (value) => value === getValues().password || "Password nned to match" }) }} />

      <StyledFormRow>
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </StyledFormRow>
    </Form >
  );
}

export default SignupForm;
