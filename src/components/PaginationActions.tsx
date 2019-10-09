import { IconButton } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

export const ROWS_PER_PAGE = 3

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}))

const PaginationActions = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { count, page, onChangePage } = props

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1)
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'ltr' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / ROWS_PER_PAGE) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  )
}
PaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
}

export default PaginationActions
