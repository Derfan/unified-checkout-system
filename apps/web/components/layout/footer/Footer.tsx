import { Button } from '../../ui';

export const Footer = () => {
  return (
    <footer className="flex justify-between p-4 bg-white">
      <Button variant="tertiary">Go Back</Button>

      <Button variant="primary">Next Step</Button>
    </footer>
  );
};
