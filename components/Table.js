import { forwardRef } from 'react'
import MaterialTable from 'material-table'
import { Button } from '@/components'
import tw from 'twin.macro'
// rdeeasadadd
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

export default function Table(props) {
  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        { title: 'id', field: 'id', editable: 'never' },
        { title: 'quote', field: 'quote', editable: 'always' },
        { title: 'author', field: 'quote_by', editable: 'never' },
        { title: 'status', field: 'is_approved', editable: 'never' }
      ]}
      cellEditable={{
        cellStyle: {},
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
          return axios({
            method: 'patch',
            url: '/api/admin',
            data: {
              val: newValue,
              id: rowData.id
            }
          }).then(() => {
            alert(`Update  quote: ${rowData.quote}`)
          })
        }
      }}
      data={props.quote}
      actions={[
        {
          icon: tableIcons.Check,
          tooltip: 'Approved',
          onClick: (event, rowData) => {
            axios({
              method: 'put',
              url: '/api/admin',
              data: {
                val: !rowData.is_approved,
                id: rowData.id
              }
            }).then(() => {
              alert(`Approved quote: ${rowData.quote}`)
            })
          }
        },
        (rowData) => ({
          icon: tableIcons.Delete,
          tooltip: 'Delete User',
          onClick: async (event, rowData) => {
            confirm('You want to delete ' + rowData.quote)
            axios({
              method: 'delete',
              url: '/api/admin',
              data: {
                val: rowData.id
              }
            }).then(() => {
              alert('berhasil delete')
            })
          }
        })
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
  )
}
