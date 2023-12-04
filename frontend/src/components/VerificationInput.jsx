import { useState, useEffect, useRef } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
function VerificationInput({ onInputComplete }) {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (event, index) => {
    const { value } = event.target;
    const newDigits = [...digits];

    newDigits[index] = value.slice(-1); // Get the last character
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && !digits[index]) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'Enter' && index === 5 && digits.join('').length === 6) {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    const verificationCode = digits.join('');
    if (onInputComplete) {
      onInputComplete(verificationCode);
    }
  };

  return (
    <div>
      <HStack>
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={el => inputRefs.current[index] = el}
            id={`digit-${index}`}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
