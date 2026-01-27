import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface } from '../../components/ui';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8 bg-blue-800" />

      <main className="grow bg-blue-100 px-4">
        <Surface>Surface</Surface>
      </main>

      <StepNavigation />
    </>
  );
}
