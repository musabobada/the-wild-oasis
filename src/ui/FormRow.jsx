import { styled } from "styled-components";
import Input from "./Input";
import { Textarea } from "./Textarea";
import FileInput from "./FileInput";

export const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({ label, name, type, errors, disabled, extraProps, defaultValue, onChange, register }) => {
  if (type === "textarea")
    return (
      <StyledFormRow>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Textarea type="text" defaultValue="" id={name} name={name} onChange={onChange} disabled={disabled} {...extraProps} {...register} />
        {errors?.[name]?.message && <Error>{errors[name].message}</Error>}
      </StyledFormRow>
    );
  if (type === "file")
    return (
      <StyledFormRow>
        {label && <Label htmlFor={name}>{label}</Label>}
        <FileInput id={name} name={name} type={type} onChange={onChange} disabled={disabled} defaultValue={defaultValue} {...extraProps} {...register} accept="image/*" />
        {errors?.[name]?.message && <Error>{errors[name].message}</Error>}
      </StyledFormRow>
    );
  return (
    <StyledFormRow>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input id={name} name={name} type={type} onChange={onChange} disabled={disabled} defaultValue={defaultValue} {...extraProps} {...register} />
      {errors?.[name]?.message && <Error>{errors[name].message}</Error>}
    </StyledFormRow>
  );
};
export default FormRow;
