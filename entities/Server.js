const mongoose = require("mongoose");

const ServerSchema = mongoose.Schema({
  serverId: {
    type: String,
    required: true,
  },
  dropChannel: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Servers", ServerSchema);
