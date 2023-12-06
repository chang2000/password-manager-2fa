const { verify } = require('../../controllers/auth');

describe('verify', () => {
  // Mock the response object
  const res = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  it('successfully verifies the token', async () => {
    // Setup User mock
    const mockUser = {
      secret: 'user-secret',
      twoFACompleted: false,
      save: jest.fn().mockResolvedValue(true),
      getJwt: jest.fn().mockReturnValue('jwt-token')
    };
    User.findOne.mockResolvedValue(mockUser);

    // Setup speakeasy mock
    speakeasy.totp.verify.mockReturnValue(true);

    // Mock request object
    const req = {
      body: { email: 'user@example.com', token: '123456' }
    };

    // Call the function
    await verify(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(speakeasy.totp.verify).toHaveBeenCalledWith({
      secret: 'user-secret',
      encoding: 'base32',
      token: '123456'
    });
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: 'jwt-token'
    });
  });
});
