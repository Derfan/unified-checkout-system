import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

export default function CheckoutPage() {
  return (
    <>
      <Stepper />

      <main className="grow bg-blue-100"></main>

      <StepNavigation />
    </>
  );
}
