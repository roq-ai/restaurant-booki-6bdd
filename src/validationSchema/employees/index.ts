import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
