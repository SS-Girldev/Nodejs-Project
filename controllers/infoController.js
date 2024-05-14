//infoController.js

const { models } = require('../sequelize-init');

const storeInfo = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, address, contact, referenceNo } = req.body;
    
    // Get the user ID from the request body or session
    const userId = req.body.user_id || req.user.id;

    // Create a new Info instance
    const info = await models.Info.create({
      name,
      address,
      contact,
      reference_no: referenceNo, // assuming referenceNo matches the column name in the Info table
      user_id: userId
    });

    // Redirect back to the profile page or any other page
    res.redirect('/profile');
  } catch (error) {
    console.error('Error storing info:', error);
    // Handle errors, e.g., show an error page
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  storeInfo
};