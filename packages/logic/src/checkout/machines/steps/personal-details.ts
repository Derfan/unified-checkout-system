import { PersonalDetailsSchema } from '@repo/schema';
import type { PersonalDetails } from '@repo/schema';

import { createStepMachine } from '../step-factory';
import { savePersonalDetails } from '../../actors/api-services';

export const personalDetailsMachine = createStepMachine<PersonalDetails>({
  id: 'personal-details',
  schema: PersonalDetailsSchema,
  saveData: savePersonalDetails,
});
