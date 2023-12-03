import { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
function VerificationInput({onInputComplete}) {
  const [digits, setDigits] = useState(Array(6).fill(''));

  const handleChange = (value, index) => {
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1); // Get the last character
    setDigits(newDigits);

    // Auto-focus to next input field if there's a next one and current value is filled
    if (value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = digits.join('');
    if (onInputComplete)
      onInputComplete(verificationCode); // Invoke the callback with the input value

  };

  return (
    <div>
      <HStack>
        {digits.map((digit, index) => (
          <Input
            key={index}
            id={`digit-${index}`}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            maxLength={1}
            size="lg"
            textAlign="center"
            borderColor={'black'}
            borderWidth="2px"
          />
        ))}
      </HStack>
      <Button onClick={handleSubmit} mt={4} colorScheme="blue">
        Submit
      </Button>
    </div>
  );
}

export default VerificationInput;
