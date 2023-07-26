import { useState } from 'react'
import { RiFilterOffLine } from 'react-icons/ri'

const Filter = ({
  search,
  setSearch,
  handleOnChangeSearch,
  handleSearch,
  apiString,
  isSearch,
  setIsSearch,
}) => {
  const handleClearFilter = () => {
    setSearch({
      address: '',
      avatar: '',
      birthday: '',
      className: '',
      courseName: '',
      fieldName: '',
      year: '',
      courseId: '',
      email: '',
      code: '',
      fullName: '',
      gender: '',
      phone: '',
      type: '',
      username: '',
    })
    setIsSearch(!isSearch)
  }

  const [params, setParams] = useState({
    param1: '',
    param2: '',
  })

  const beforeSearch = () => {
    if (apiString === 'field') {
      handleSearch('code', 'name', search.code, search.fieldName)
    }
    if (apiString === 'course') {
      handleSearch('name', 'year', search.courseName, search.year)
    }
    if (apiString === 'class') {
      handleSearch('name', 'courseId', search.className, search.courseId)
    }
  }
  return (
    <tr className='border border-slate-300'>
      <td scope='col' className='px-5 py-1'>
        <button onClick={() => handleClearFilter()}>
          <RiFilterOffLine className='w-6 h-6 fill-blue-500 border' />
        </button>
      </td>
      <td className='px-1 '>
        <button
          type='button'
          className=' text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md  font-medium text-[11px] px-4 py-2 my-1 text-center'
          onClick={() => beforeSearch()}
        >
          Tìm kiếm
        </button>
      </td>
      <td className='px-2'>
        <input
          type='text'
          value={
            (apiString === 'field' ? search.code : '') ||
            (apiString === 'class' ? search.className : '') ||
            (apiString === 'course' ? search.courseName : '')
          }
          name={
            (apiString === 'field' && 'code') ||
            (apiString === 'course' && 'courseName') ||
            (apiString === 'class' && 'className')
          }
          onChange={handleOnChangeSearch}
          className='block flex-1 rounded-md w-full my-1 px-3 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Nhập từ khóa tìm kiếm'
        />
      </td>
      <td className='px-2'>
        <input
          type='text'
          value={
            (apiString === 'field' ? search.fieldName : '') ||
            (apiString === 'course' ? search.year : '') ||
            (apiString === 'class' ? search.courseId : '')
          }
          name={
            (apiString === 'field' && 'fieldName') ||
            (apiString === 'course' && 'year') ||
            (apiString === 'class' && 'courseId')
          }
          onChange={handleOnChangeSearch}
          className='block flex-1 rounded-md w-full my-1 px-3 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Nhập từ khóa tìm kiếm'
        />
      </td>
    </tr>
  )
}

export default Filter
