require("dotenv").config();
const jwtDecode = require("../utils/jwtDecode");
const { errResponse, successResponse } = require("../utils/Response");
const User = require("../models/user");
const { encrypt, decrypt } = require("../utils/Crypt");
const { OpenAI } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// This function is used to test the route
async function userPage(req, res) {
  // Get the user from the request object
  const user = req.user;
  // Create a response object
  responseObject = {
    fName: user.fName,
    lName: user.lName,
    msg: "User Authorized Successfully",
  };
  // Send the response
  successResponse(res, 201, responseObject);
}

// This function is used to save the password
async function saveUserPassword(req, res) {
  // Get the website, username, email, password and passkey from the request body
  const { website, username, email, password, passkey } = req.body;
  const uid = req.user._id;

  try {
    // Find the user by id
    const user = await User.findById(uid);
    if (!user) {
      // If no user found, return an error
      return errResponse(res, 404, "Not Authorized for following action.");
    }

    if (!passkey) {
      // If no passkey found, return an error
      return errResponse(res, 400, "Secret Key is missing.");
    }

    // Push the password entry to the passwordEntries array
    user.passwordEntries.push({
      website,
      username,
      email,
      password: encrypt(password, passkey),
    });

    // Save the user
    await user.save();
    // Send the response
    return successResponse(res, 200, "Password Saved Successfully");
  } catch (error) {
    // If some error occured, return an error
    console.log(error);
    return res, 401, "Something went wrong.";
  }
}

// This function is used to get the password
async function getUserPassword(req, res) {
  // Get the passkey from the request body
  const { passkey } = req.body;
  // Get the user id from the request object
  const uid = req.user._id;

  try {
    // Find the user by id
    const user = await User.findById(uid);
    if (!user) {
      // If no user found, return an error
      return errResponse(res, 404, "Not Authorized for following action.");
    }

    if (!passkey) {
      // If no passkey found, return an error
      return errResponse(res, 400, "Secret Key is missing.");
    }

    // Decrypt the password entries
    const decPasswordEntries = user.passwordEntries.map((passwdEntry) => {
      return {
        _id: passwdEntry._id,
        website: passwdEntry.website,
        email: passwdEntry.email,
        username: passwdEntry.username,
        password: decrypt(passwdEntry.password, passkey),
      };
    });

    // Send the response
    return successResponse(res, 200, decPasswordEntries);
  } catch (error) {
    // If some error occured, return an error
    console.log(error);
    return res, 401, "Something went wrong.";
  }
}

// This function is used to delete the password entry
async function delPassEntry(req, res) {
  // Get the id from the request body
  const uid = req.user._id;
  const id = req.body.entryId;

  if (!id) {
    // If no id found, return an error
    return errResponse(res, 400, "No Password Entry was found");
  }

  try {
    // Find the user by id and update the passwordEntries array
    await User.findByIdAndUpdate(uid, {
      $pull: { passwordEntries: { _id: id } },
    }).then(() => {
      // Send the response
      successResponse(res, 200, "Deleted Password Entry");
    });
  } catch (error) {
    console.log(error);
  }
}

async function chat(req, res) {
  console.log("api key", OPENAI_API_KEY);
  const uid = req.user._id;
  const user = await User.findById(uid);
  console.log(user);
  if (!user.GPTVerified) {
    console.log("not verified");
    errResponse(res, 400, "Not GPT Verified. Please contact admin.");
    return;
  }

  const { message } = req.body;

  const prompt = `
  You're a NLP analyzer build-in a password manager, if I send you message that contains the information/instruction/command to delete a password on certain site, return me a sturct answer:
  "URL=the websirte url". Don't reply anything else.
  Only when I type 'STOP', you just stop listening to what I say.
  Here is the user's message: ${message}
  `;
  try {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${prompt}` }],
      model: "gpt-3.5-turbo",
    });
    answer = chatCompletion.choices[0].message.content;
    site = answer.split("URL=")[1];

    console.log(site);
    if (site) {
      try {
        // Find the user by id and update the passwordEntries array
        await User.findByIdAndUpdate(uid, {
          $pull: { passwordEntries: { website: site } },
        }).then(() => {
          answer = `Password of ${site} is deleted successfully.`;
        });
      } catch (error) {
        answer = `Failed to delete password of ${site}.`;
      }
    }

    res.json({ message: answer });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  userPage,
  saveUserPassword,
  getUserPassword,
  delPassEntry,
  chat,
};
