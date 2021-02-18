import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ quotedBy: '', quote: '' })
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id == currentId) : null
  )
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const clear = () => {
    setCurrentId(0)
    setPostData({
      quotedBy: '',
      quote: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createPost(postData))
      clear()
    } else {
      dispatch(updatePost(currentId, postData))
      clear()
    }
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? `Editing a Quote` : 'Creating a Quote'}
        </Typography>
        <TextField
          name='quotedBy'
          variant='outlined'
          label='Quoted By'
          fullWidth
          value={postData.quotedBy}
          onChange={(e) =>
            setPostData({ ...postData, quotedBy: e.target.value })
          }
        />
        <TextField
          name='quote'
          variant='outlined'
          label='Quote'
          fullWidth
          multiline
          rows={4}
          value={postData.quote}
          onChange={(e) => setPostData({ ...postData, quote: e.target.value })}
        />

        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
