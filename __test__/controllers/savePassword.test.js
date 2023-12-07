const { saveUserPassword } = require('../../controllers/private');
const User = require('../../models/user');

const { encrypt } = require('../../utils/Crypt');

jest.mock('../../models/user');
jest.mock('../../utils/Crypt');

describe('saveUserPassword', () => {
  // Mock the response object
  const res = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  it('successfully saves the password', async () => {
    // Setup User mock
    const mockUser = {
      _id: 'some-user-id',
      passwordEntries: [],
      save: jest.fn().mockResolvedValue(true)
    };
    User.findById.mockResolvedValue(mockUser);
    encrypt.mockImplementation((password, passkey) => `encrypted-${password}`);

    // Mock request object
    const req = {
      user: { _id: mockUser._id },
      body: { 
        website: 'example.com',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        passkey: 'passkey123'
      }
    };

    // Call the function
    await saveUserPassword(req, res);

    // Assertions
    expect(User.findById).toHaveBeenCalledWith(mockUser._id);
    expect(mockUser.passwordEntries).toHaveLength(1);
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: "Password Saved Successfully"
    });
  });
});
