import { Box, FormControl, FormControlProps, TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { ReactNode } from "react";
import { RowStack } from "../RowStack";
import { FieldHelperText } from "./FieldHelperText";
import { FieldLabel } from "./FieldLabel";

export type TextInputProps = TextFieldProps & {
  helperText?: string;
  name: string;
  label?: string;
  placeholder?: string | number;
  formControlProps?: FormControlProps;
  maxLength?: number;
  startComponent?: ReactNode;
  endComponent?: ReactNode;
};

export function TextInput({
  helperText,
  label,
  placeholder,
  multiline = false,
  rows = 1,
  fullWidth = true,
  name,
  required,
  formControlProps = {},
  maxLength,
  endComponent = null,
  startComponent = null,
  ...props
}: TextInputProps) {
  const [field, { error, touched, value }, { setTouched, setValue }] = useField<string | string[]>(name);

  const val = Array.isArray(value) ? value[0] : value;
  const errorMessage = Array.isArray(error) ? error[0] : error;
  const errorState = touched ? Boolean(errorMessage) : false;

  const labelField = label ? (
    <FieldLabel
      required={required}
      error={
        touched && errorMessage
          ? errorMessage.toLowerCase().includes("required") || errorMessage.toLowerCase().includes("at least 1 element")
            ? ""
            : errorMessage
          : undefined
      }
      label={label}
      name={field.name}
    />
  ) : null;

  let maxCharLengthField: ReactNode = null;

  const inputProps: Partial<TextFieldProps> = {};

  if (maxLength) {
    inputProps.inputProps = { maxLength };
    maxCharLengthField = (
      <FieldHelperText
        sx={{
          mb: 0.5,
        }}
        helperText={`${val?.length || 0}/${maxLength}`}
      />
    );
  }

  return (
    <FormControl {...formControlProps}>
      {labelField} {maxCharLengthField}
      <RowStack>
        {startComponent}
        <TextField
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          error={errorState}
          id={field.name}
          placeholder={placeholder ?? label}
          onClick={() => {
            setTouched(true, true);
          }}
          {...inputProps}
          {...field}
          {...props}
          onChange={(e) => {
            const textValue = e.target.value;
            setValue(Array.isArray(value) ? [textValue] : textValue);
          }}
        />
        {endComponent}
      </RowStack>
      {helperText && (
        <Box my={0.5}>
          <FieldHelperText helperText={helperText} />
        </Box>
      )}
    </FormControl>
  );
}
