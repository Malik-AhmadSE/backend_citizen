const UserModel = require("../models/user");

const ChartData = {
  async UserCount(req, res, next) {
    try {
      const userData = await UserModel.find({});

      // Create an object to store the user counts based on timestamps
      const userCountByTimestamp = {};

      // Count the users based on similar timestamps
      userData.forEach(user => {
        const { createdAt } = user;

        // Get the timestamp from the createdAt field
        const timestamp = createdAt.toISOString().split('T')[0];

        if (timestamp in userCountByTimestamp) {
          userCountByTimestamp[timestamp]++;
        } else {
          userCountByTimestamp[timestamp] = 1;
        }
      });

      console.log(userCountByTimestamp);
      
      // Respond with the user count by timestamp
      res.json(userCountByTimestamp);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while counting users.' });
    }
  }
};

module.exports = ChartData;
