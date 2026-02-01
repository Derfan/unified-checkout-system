import { Heading, Text, CheckIcon } from '@components/ui';

export const CompletedStep = () => (
  <div className="flex flex-col items-center md:my-20">
    <CheckIcon size="lg" className="mt-2" />
    <Heading align="center" className="mt-4">
      Thank You!
    </Heading>
    <Text align="center" className="mt-2">
      Thanks for confirming your order! We hope you have fun using our platform. If you ever need
      support, please feel free to email us at support@loremipsum.com.
    </Text>
  </div>
);
