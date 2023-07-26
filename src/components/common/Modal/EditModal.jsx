import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom'
import { axiosBase } from '../../../utils/api'

const EditModal = () => {
  const { data } = useLoaderData()
  const navigate = useNavigate()
  const { apiString, getData } = useOutletContext()
  const [param, setParam] = useState({})
  const [getEditData, setGetEditData] = useState(data)

  useEffect(() => {
    if (apiString === 'course') {
      return setParam({
        ...param,
        name: getEditData.name,
        year: getEditData.year,
      })
    }
    if (apiString === 'class') {
      return setParam({
        ...param,
        name: getEditData.name,
        course_id: getEditData.courseId,
      })
    }
    if (apiString === 'field') {
      return setParam({
        ...param,
        code: getEditData.code,
        name: getEditData.name,
      })
    }
  }, [apiString, getEditData])

  const handleInputChange = (e) => {
    const key = e.target.name
    setGetEditData({ ...getEditData, [key]: e.target.value })
  }

  const editData = async () => {
    const res = await axiosBase({
      url: `api/${apiString}/${getEditData.id}`,
      method: 'PUT',
      params: param,
    })
    if (res) {
      alert('Sửa thành công')
      navigate(`/admin/${apiString}`)
      getData()
    }
  }
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-gray-200 bg-opacity-70'>
      <div className='w-[850px] h-[237px] bg-white shadow-2xl absolute top-[100px] left-1/2 -translate-x-1/2'>
        <div>
          <h3 className='w-full p-4 text-xl'>
            Thêm
            {(apiString === 'field' && ' ngành nghề') ||
              (apiString === 'course' && ' khóa') ||
              (apiString === 'class' && ' lớp')}
          </h3>
        </div>
        <div>
          <div className='flex items-center justify-around px-4 border py-12'>
            <label htmlFor='coursename'>
              {(apiString === 'field' && 'Mã ngành nghề') ||
                (apiString === 'course' && 'Tên khóa') ||
                (apiString === 'class' && 'Tên lớp')}
            </label>
            <input
              type='text'
              id='coursename'
              name={
                (apiString === 'field' && 'code') ||
                (apiString === 'course' && 'name') ||
                (apiString === 'class' && 'name')
              }
              value={
                (apiString === 'field' && getEditData.code) ||
                (apiString === 'course' && getEditData.name) ||
                (apiString === 'class' && getEditData.name)
              }
              onChange={handleInputChange}
              className='block flex-1 rounded-lg mx-3 py-1 px-3 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            />
            <label htmlFor='courseyear'>
              {(apiString === 'field' && 'Ngành nghề') ||
                (apiString === 'course' && 'Năm bắt đầu') ||
                (apiString === 'class' && 'Tên khóa')}
            </label>
            <input
              type='text'
              id='courseyear'
              name={
                (apiString === 'field' && 'name') ||
                (apiString === 'course' && 'year') ||
                (apiString === 'class' && 'courseId')
              }
              value={
                (apiString === 'field' && getEditData.name) ||
                (apiString === 'course' && getEditData.year) ||
                (apiString === 'class' && getEditData.courseId)
              }
              onChange={handleInputChange}
              className='block flex-1 rounded-lg py-1 px-3 mx-3 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>

        <div>
          <button
            type='button'
            className='float-right text-white hover:text-white border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-2 mr-4 ml-2 text-center '
            onClick={editData}
          >
            Lưu
          </button>
          <Link to={`/admin/${apiString}`}>
            <button
              type='button'
              className='float-right text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-2  text-center '
            >
              Hủy
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditModal
