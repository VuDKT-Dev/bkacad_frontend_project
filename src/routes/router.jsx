import { createBrowserRouter, defer, redirect } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import AdminPage from '../pages/AdminPage'
import Table from '../components/common/Table'
import EditModal from '../components/common/Modal/EditModal'
import { axiosBase } from '../utils/api'
import EditUserModal from '../components/common/Modal/EditUserModal'
import ProtectRouter from './ProtectRouter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectRouter>
        <AdminPage />
      </ProtectRouter>
    ),
    children: [
      {
        path: 'user',
        element: <Table />,
        loader: () => 'user',
        children: [
          {
            path: ':id',
            element: <EditUserModal />,
            loader: async ({ request, params }) => {
              const { id } = params
              const res = await axiosBase({
                url: `api/admin/user/${id}`,
                method: 'GET',
              })
              return defer(res)
            },
          },
        ],
      },
      {
        path: 'class',
        element: <Table />,
        loader: () => 'class',
        children: [
          {
            path: ':id',
            element: <EditModal />,
            loader: async ({ request, params }) => {
              const { id } = params
              const res = await axiosBase({
                url: `api/class/${id}`,
                method: 'GET',
              })
              return defer(res)
            },
          },
        ],
      },
      {
        path: 'course',
        element: <Table />,
        loader: () => 'course',
        children: [
          {
            path: ':id',
            element: <EditModal />,
            loader: async ({ request, params }) => {
              const { id } = params
              const res = await axiosBase({
                url: `api/course/${id}`,
                method: 'GET',
              })
              return defer(res)
            },
          },
        ],
      },
      {
        path: 'field',
        element: <Table />,
        loader: () => 'field',
        children: [
          {
            path: ':id',
            element: <EditModal />,
            loader: async ({ request, params }) => {
              const { id } = params
              const res = await axiosBase({
                url: `api/field/${id}`,
                method: 'GET',
              })
              return defer(res)
            },
          },
        ],
      },
    ],
  },
])
export default router
