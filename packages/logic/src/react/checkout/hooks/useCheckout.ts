import type { CheckoutFlowStates } from '../../../checkout';
import { CheckoutContext } from '../context';

export const useCheckoutActorRef = () => CheckoutContext.useActorRef();

export const useCheckoutSelector = CheckoutContext.useSelector;

export const useCheckoutState = () =>
  useCheckoutSelector((state) => ({
    currentStep: state.value,
    context: state.context,
  }));

export const useCheckoutNavigation = () => {
  const actorRef = useCheckoutActorRef();

  return {
    goBack: () => actorRef.send({ type: 'BACK' }),
    goToStep: (step: CheckoutFlowStates) => actorRef.send({ type: 'GO_TO_STEP', payload: step }),
  };
};
