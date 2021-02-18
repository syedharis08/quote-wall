// export const createPost = async (req, res) => {
//   const post = req.body
//   console.log(post)
//   let newPost = new PostMessage(post)
//   try {
//     newPost = await newPost.save()
//     res.status(201).json(newPost)
//   } catch (error) {
//     res.status(409).json({ message: error.message })
//   }
// }

import express from 'express'
import mongoose from 'mongoose'

import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await PostMessage.findById(id)

    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const { quotedBy, quote } = req.body

  const newPostMessage = new PostMessage({
    quotedBy,
    quote,
  })

  try {
    await newPostMessage.save()

    res.status(201).json(newPostMessage)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { quotedBy, quote } = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const updatedPost = { quotedBy, quote, _id: id }

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  await PostMessage.findByIdAndRemove(id)

  res.json({ message: 'Post deleted successfully.' })
}

export default router
