import { Stepper } from './_components/Stepper';
import { CheckoutController } from './_components/CheckoutController';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <CheckoutController />
    </>
  );
}
