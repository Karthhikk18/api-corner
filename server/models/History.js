import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: String, // String type for cross-compat with local JSON DB
    required: true
  },
  apiId: {
    type: String,
    required: true
  },
  apiName: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: Number,
    default: 200
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.models.History || mongoose.model('History', historySchema);

export default History;
