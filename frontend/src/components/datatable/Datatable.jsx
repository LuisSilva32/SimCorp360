import React, { useEffect, useState, useContext } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import '../../styles/datatable.scss'
import Loader from '../loader/Loader'
import NoData from '../../assets/noData.png'
import { DarkModeContext } from '../../context/darkModeReducer'

export default function Datatable ({ data, columnsConfig, noDataMessage, title, searchAttribute, searchPlaceholder, selectableRows }) {
  const { darkMode } = useContext(DarkModeContext) // Consume el contexto
  const [columns, setColumns] = useState([])
  const [pending, setPending] = useState(true)
  const [records, setRecords] = useState([])

  useEffect(() => {
    if (data.length > 0) {
      setColumns(columnsConfig)
      setRecords(data)
      setPending(false)
    }
  }, [data, columnsConfig])

  function handleFilter (event) {
    const searchValue = event.target.value.toLowerCase()
    const newData = data.filter(row => {
      return row[searchAttribute].toString().toLowerCase().includes(searchValue)
    })
    setRecords(newData)
  }

  // Define temas claros y oscuros
  createTheme('light', {
    text: {
      primary: 'gray',
      secondary: 'gray'
    },
    background: {
      default: '#ffffff'
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF'
    },
    divider: {
      default: 'lightgray'
    }
  }, 'light')

  createTheme('dark', {
    text: {
      primary: '#gray',
      secondary: '#gray'
    },
    background: {
      default: '#1B2537'
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF'
    },
    divider: {
      default: '#4cceac'
    }
  }, 'dark')

  return (
    <div className='datatable'>
      <div className='header'>
        <h1 className='title-table'>{title}</h1>
        <div className='form'>
          <div className='search-container'>
            <i className='bi bi-filter' />
            <input
              className='input'
              placeholder={searchPlaceholder || 'Buscar...'}
              onChange={handleFilter}
              type='text'
            />
            <span className='input-border' />
          </div>
        </div>
      </div>
      <DataTable
        className='data-contend'
        columns={columns}
        data={records}
        progressPending={pending}
        progressComponent={<Loader />}
        noDataComponent={<img className='noData-img' src={NoData} /> || noDataMessage}
        pagination
        paginationPerPage={7}
        selectableRows={selectableRows}
        fixedHeader
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  )
}
