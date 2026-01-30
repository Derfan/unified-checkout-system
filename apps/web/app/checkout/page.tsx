import { Stepper } from './_components/Stepper';
import { CheckoutController } from './_components/CheckoutController';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="fixed top-0 left-0 right-0 py-8" />

      <CheckoutController />
    </>
  );
}
