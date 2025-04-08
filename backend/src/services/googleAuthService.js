const User = require("../models/User")
const { sendEmail } = require("./emailService")

async function fetchGoogleUserInfo(accessToken) {
    try {
      // Use the access token to get user info from Google
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
  
      if (!response.ok) {
        throw new Error("Failed to fetch user info from Google")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching Google user info:", error)
      return null
    }
  }
  
  /**
   * Create a new user from Google data
   */
  async function createGoogleUser(googleId, email, name, picture) {
    // Generate username from email
    const usernamePrefix = email.split("@")[0]
    let username = usernamePrefix
    let counter = 1
  
    // Ensure unique username
    while (await User.exists({ username })) {
      username = `${usernamePrefix}${counter}`
      counter++
    }
  
    // Split name into first/last names
    const [firstName, ...lastNameParts] = name.split(" ")
    const lastName = lastNameParts.join(" ") || "User"
    await sendEmail(email, 'registration_successful', firstName);

    // Create and return the new user
    return await User.create({
      googleId,
      email,
      firstName,
      lastName,
      username,
      profile: picture || undefined,
      isEmailVerified: true, // Google accounts have verified emails
    })
  }

module.exports = {
    fetchGoogleUserInfo,
    createGoogleUser
  }