const { register } = require('../../controllers/auth');
const User = require('../../models/user');
const speakeasy = require('speakeasy');

jest.mock('../../models/user');
jest.mock('speakeasy');

const req = {
  body: {
    fName: 'John',
    lName: 'Doe',
    email: 'john@example.com',
    password: 'password',
  }
}

const res = {
  status: jest.fn(() => res),
  json: jest.fn()
}

const errResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ success: false, error: message });
};

it('return status code of 200', async () => {
  // Set up mocks
  const temp_secret = { base32: 'SECRET', otpauth_url: 'URL' };
  speakeasy.generateSecret.mockReturnValue(temp_secret);
  User.create.mockResolvedValue({
    fName: 'John',
    lName: 'Doe',
    email: 'john@example.com',
    password: 'password',
  })

  await register(req, res);
  expect(User.create).toHaveBeenCalledWith({
    fName: 'John',
    lName: 'Doe',
    email: 'john@example.com',
    password: 'password',
    secret: temp_secret.base32,
    qrCodeUrl: temp_secret.otpauth_url,
    twoFACompleted: false
  });
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    data: "User Created Successfully. Scan QR Code to verify.",
    email: 'john@example.com',
    qrCodeUrl: temp_secret.otpauth_url,
    twoFACompleted: false
  });
});

it('should handle duplicate email error', async () => {
  // Mock User.create to throw a duplicate key error
  User.create.mockRejectedValue({ code: 11000 });

  // Call the function
  await register(req, res);

  // Assertions
  expect(res.status).toHaveBeenCalledWith(400);
});