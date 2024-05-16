//infoController.js

const { Info } = require('../config/database');
const sequelize = require('../config/database'); 
const storeInfo = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, address, contact, gender} = req.body;
    
    // Get the user ID from the request body or session
    const userId = req.body.user_id;

    // Create a new Info instance
    const info = await Info.create({
      name,
      address,
      contact,
      gender, 
      user_id: userId
    });

   
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