import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createReservation } from 'apiSdk/reservations';
import { Error } from 'components/error';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TableLayoutInterface } from 'interfaces/table-layout';
import { getTableLayouts } from 'apiSdk/table-layouts';
import { ReservationInterface } from 'interfaces/reservation';

function ReservationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReservationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReservation(values);
      resetForm();
      router.push('/reservations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReservationInterface>({
    initialValues: {
      guest_name: '',
      guest_phone_number: '',
      guest_email: '',
      reservation_time: new Date(new Date().toDateString()),
      number_of_guests: 0,
      table_layout_id: (router.query.table_layout_id as string) ?? null,
    },
    validationSchema: reservationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Reservation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="guest_name" mb="4" isInvalid={!!formik.errors?.guest_name}>
            <FormLabel>Guest Name</FormLabel>
            <Input type="text" name="guest_name" value={formik.values?.guest_name} onChange={formik.handleChange} />
            {formik.errors.guest_name && <FormErrorMessage>{formik.errors?.guest_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="guest_phone_number" mb="4" isInvalid={!!formik.errors?.guest_phone_number}>
            <FormLabel>Guest Phone Number</FormLabel>
            <Input
              type="text"
              name="guest_phone_number"
              value={formik.values?.guest_phone_number}
              onChange={formik.handleChange}
            />
            {formik.errors.guest_phone_number && (
              <FormErrorMessage>{formik.errors?.guest_phone_number}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="guest_email" mb="4" isInvalid={!!formik.errors?.guest_email}>
            <FormLabel>Guest Email</FormLabel>
            <Input type="text" name="guest_email" value={formik.values?.guest_email} onChange={formik.handleChange} />
            {formik.errors.guest_email && <FormErrorMessage>{formik.errors?.guest_email}</FormErrorMessage>}
          </FormControl>
          <FormControl id="reservation_time" mb="4">
            <FormLabel>Reservation Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.reservation_time ? new Date(formik.values?.reservation_time) : null}
                onChange={(value: Date) => formik.setFieldValue('reservation_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="number_of_guests" mb="4" isInvalid={!!formik.errors?.number_of_guests}>
            <FormLabel>Number Of Guests</FormLabel>
            <NumberInput
              name="number_of_guests"
              value={formik.values?.number_of_guests}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('number_of_guests', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.number_of_guests && <FormErrorMessage>{formik.errors?.number_of_guests}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TableLayoutInterface>
            formik={formik}
            name={'table_layout_id'}
            label={'Select Table Layout'}
            placeholder={'Select Table Layout'}
            fetcher={getTableLayouts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.table_number}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'reservation',
  operation: AccessOperationEnum.CREATE,
})(ReservationCreatePage);
