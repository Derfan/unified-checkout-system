import { Heading, Text, CheckIcon } from '../../../../components/ui';
import { StepWrapper } from '../StepWrapper';

export const CompletedStep = () => (
  <StepWrapper className="flex flex-col items-center">
    <CheckIcon size="lg" className="mt-2" />
    <Heading align="center" className="mt-4">
      Thank You!
    </Heading>
    <Text align="center" className="mt-2">
      Thanks for confirming your order! We hope you have fun using our platform. If you ever need
      support, please feel free to email us at support@loremipsum.com.
    </Text>
  </StepWrapper>
);
