import { CheckoutContext } from '../providers/CheckoutProvider';

export const useCheckoutActorRef = CheckoutContext.useActorRef;

export const useCheckoutSelector = CheckoutContext.useSelector;

export const useCheckoutChildActorRef = <T extends string>(key: T) => {
  return useCheckoutSelector((state) => state.children[key]);
};
