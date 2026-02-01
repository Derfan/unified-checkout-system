const MASK_PATTERNS: Record<string, string> = {
  '+49': ' #### #######', // Germany
  '+43': ' #### #######', // Austria
  '+41': ' ## ### ## ##', // Switzerland
  '+33': ' # ## ## ## ##', // France
  '+31': ' ## #### ###', // Netherlands
  '+39': ' ### #######', // Italy
  '+34': ' ### ### ###', // Spain
  '+44': ' #### ######', // United Kingdom
};

export const formatDynamicPhone = (value: string) => {
  const raw = value.startsWith('+') ? value : `+${value.replace(/\D/g, '')}`;
  const countryCode = Object.keys(MASK_PATTERNS).find((code) => raw.startsWith(code));

  if (!countryCode) return raw;

  const mask = MASK_PATTERNS[countryCode];

  if (!mask) return raw;

  const digits = raw.slice(countryCode.length).replace(/\D/g, '');

  let formatted = countryCode;
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === '#') {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      formatted += mask[i];
    }
  }

  return formatted;
};
