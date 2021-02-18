import mongoose from 'mongoose'
const PostSchema = new mongoose.Schema({
  quotedBy: String,
  quote: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const PostMessage = mongoose.model('postMessage', PostSchema)

export default PostMessage
