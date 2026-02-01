'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonaTitles, PersonalDetails, PersonalDetailsSchema } from '@repo/schema';
import { useCheckoutStep } from '@repo/logic/react';

import { Row } from '../../../../components/layout';
import { FormField, RadioGroup, Input, PhoneInput } from '../../../../components/forms';
import { StepWrapper } from '../StepWrapper';

export const PersonalInfoStep = () => {
  const { state, submit } = useCheckoutStep<PersonalDetails>('personal-details');

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PersonalDetails>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: state.data ?? {},
  });

  return (
    <StepWrapper
      title="Personal Information"
      description="Please provide your personal details for the order."
      submitting={state.submitting}
      onSubmit={handleSubmit(submit)}
    >
      <FormField label="Title" errorMessage={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={Object.entries(PersonaTitles).map(([label, value]) => ({
                label,
                value,
              }))}
              error={!!errors.title}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </FormField>

      <Row space="sm" className="mt-2">
        <FormField id="firstName" label="First Name" errorMessage={errors.firstName?.message}>
          <Input placeholder="e.g. Stephen" {...register('firstName')} />
        </FormField>

        <FormField id="lastName" label="Last Name" errorMessage={errors.lastName?.message}>
          <Input placeholder="e.g. King" {...register('lastName')} />
        </FormField>
      </Row>

      <FormField
        id="dateOfBirth"
        label="Date of Birth"
        className="mt-2"
        errorMessage={errors.dateOfBirth?.message}
      >
        <Input type="date" placeholder="e.g. 1990-01-01" {...register('dateOfBirth')} />
      </FormField>

      <FormField
        id="email"
        label="Email Address"
        className="mt-2"
        errorMessage={errors.email?.message}
      >
        <Input
          type="email"
          inputMode="email"
          placeholder="e.g. stephen.king@example.com"
          {...register('email')}
        />
      </FormField>

      <FormField
        id="phoneNumber"
        label="Phone Number"
        className="mt-2"
        errorMessage={errors.phoneNumber?.message}
      >
        <PhoneInput placeholder="e.g. +49 1234 567890" {...register('phoneNumber')} />
      </FormField>
    </StepWrapper>
  );
};
