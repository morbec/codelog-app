import React from 'react'
import { Link } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import { CSVLink } from 'react-csv'
import { getAllCodelogs } from '../api'

export default function CSVExporter() {
  const codeLogs = getAllCodelogs().codelogs

  if (!codeLogs.length) return <></>

  return (
    <Link component="button" variant="body2" style={{ color: '#ab003c' }}>
      <CSVLink data={codeLogs.reverse()}>
        <CloudDownload style={{ color: '#fce4ec' }} />
      </CSVLink>
    </Link>
  )
}
