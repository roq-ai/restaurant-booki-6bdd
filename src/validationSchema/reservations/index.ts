import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  guest_name: yup.string().required(),
  guest_phone_number: yup.string().required(),
  guest_email: yup.string().required(),
  reservation_time: yup.date().required(),
  number_of_guests: yup.number().integer().required(),
  table_layout_id: yup.string().nullable().required(),
});
