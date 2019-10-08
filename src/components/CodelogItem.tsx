import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Fab,
  IconButton,
  Typography
} from '@material-ui/core/'
import { green, red } from '@material-ui/core/colors'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import CodelogDialog from './CodelogDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: 30
      // maxWidth: 545
    },
    avatar: {
      backgroundColor: red[500]
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    fab: {
      margin: theme.spacing(1)
    }
  })
)

const CodelogItem = ({ codelog, handleDeleteClick, handleEditClick }) => {
  const { id, date, title, tasks, blockers, todayILearned } = codelog
  const [expanded, setExpanded] = useState(false)
  const [editting, setEditting] = useState(false)
  const classes = useStyles()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <React.Fragment>
      {editting && <CodelogDialog display={true} handleClick={handleEditClick} codelog={codelog} />}
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="letter" className={classes.avatar}>
              {title[0].toLocaleUpperCase()}
            </Avatar>
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={title}
          subheader={date}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {tasks}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Fab
            color="primary"
            style={{ backgroundColor: green[500] }}
            className={classes.fab}
            aria-label="Edit codelog"
            onClick={() => setEditting(!editting)}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="secondary"
            className={classes.fab}
            aria-label="Delete codelog"
            onClick={() => handleDeleteClick(id)}
          >
            <DeleteIcon />
          </Fab>
          <IconButton
            className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">Blockers:</Typography>
            <Typography variant="body1" component="p">
              {blockers}
            </Typography>
            <br />
            <hr />
            <br />
            <Typography variant="h6">Today I learned:</Typography>
            <Typography variant="body1" component="p">
              {todayILearned}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  )
}
CodelogItem.propTypes = {
  codelog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.string.isRequired,
    blockers: PropTypes.string,
    todayILearned: PropTypes.string
  }).isRequired,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func
}

export default CodelogItem
