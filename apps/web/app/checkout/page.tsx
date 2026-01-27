import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface } from '../../components/ui';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <main className="grow px-4">
        <Surface>Surface</Surface>
      </main>

      <StepNavigation />
    </>
  );
}
