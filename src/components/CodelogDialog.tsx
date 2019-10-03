import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core/'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { generateId } from '../api'
import { Codelog } from '../types'

const CodelogDialog = ({ display, setDisplayDialog }) => {
  const [open, setOpen] = useState(display)
  const [state, setState] = useState({
    title: '',
    tasks: '',
    blockers: '',
    todayILearned: ''
  })

  const handleSave = () => {
    // TODO:
    const codelog: Codelog = { id: generateId(), date: new Date(), ...state }
    setOpen(false)
    setDisplayDialog(false)
  }

  const handleClose = () => {
    setOpen(false)
    setDisplayDialog(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xl'} aria-labelledby="codelog-form-dialog">
      <DialogTitle id="add-codelog-title">Add new Codelog</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          variant="outlined"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.currentTarget.value })}
        />
        <TextField
          required
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="tasks"
          label="Tasks"
          type="text"
          value={state.tasks}
          onChange={(e) => setState({ ...state, tasks: e.currentTarget.value })}
        />
        <TextField
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="blockers"
          label="Blockers"
          type="text"
          value={state.blockers}
          onChange={(e) => setState({ ...state, blockers: e.currentTarget.value })}
        />
        <TextField
          fullWidth
          multiline
          rowsMax="5"
          variant="outlined"
          margin="dense"
          id="todayILearned"
          label="Today I learned"
          type="text"
          value={state.todayILearned}
          onChange={(e) => setState({ ...state, todayILearned: e.currentTarget.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
CodelogDialog.propTypes = {
  display: PropTypes.bool.isRequired,
  setDisplayDialog: PropTypes.func.isRequired
}

export default CodelogDialog
