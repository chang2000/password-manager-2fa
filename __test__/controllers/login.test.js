const { login } = require('../../controllers/auth');
const User = require('../../models/user');
const mockUserFindOne = jest.fn();

jest.mock('../../models/user', () => ({
  findOne: () => ({ select: mockUserFindOne })
}));


describe('login', () => {
  // Mock response object
  const res = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  beforeEach(() => {
    mockUserFindOne.mockResolvedValue({
      // Mocked user object
      checkPass: jest.fn().mockResolvedValue(true),
      twoFACompleted: false,
      qrCodeUrl: 'some-qr-code-url'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle valid login with 2FA not completed', async () => {
    const req = {
      body: { email: 'john@example.com', password: 'password' }
    };

    await login(req, res);

    // Assertions
    expect(mockUserFindOne).toHaveBeenCalledWith('+password');
  });
});

