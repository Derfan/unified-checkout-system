import { CheckoutContext } from '../providers/CheckoutProvider';

export const useCheckout = () => {
  return CheckoutContext.useActorRef();
};
