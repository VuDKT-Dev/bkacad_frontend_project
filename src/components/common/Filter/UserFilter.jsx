import { RiFilterOffLine } from 'react-icons/ri'

const UserFilter = ({
  searchParam,
  setSearchParam,
  handleOnChangeSearchUser,
  userSearch,
  isSearch,
  setIsSearch,
}) => {
  const handleClearFilter = () => {
    setSearchParam({
      address: '',
      birthday_start: '',
      birthday_end: '',
      class_id: '',
      course_id: '',
      field_id: '',
      course_id: '',
      email: '',
      full_name: '',
      gender: '',
      phone: '',
      type: '',
      username: '',
    })
    setIsSearch(!isSearch)
    getData()
  }
  return (
    <tr className='border border-slate-300'>
      <td scope='col' className='px-5 py-1'>
        <button onClick={() => handleClearFilter()}>
          <RiFilterOffLine className='w-6 h-6 fill-blue-500 border' />
        </button>
      </td>
      <td>
        <button
          type='button'
          className=' text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md  font-medium text-[11px] px-5 py-2 my-1 text-center'
          onClick={() => userSearch()}
        >
          Tìm kiếm
        </button>
      </td>
      <td scope='col' className='py-2 w-28'>
        <select
          name='type'
          className='flex-1 rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          onChange={handleOnChangeSearchUser}
        >
          <option value=''></option>
          <option value='ADMIN'>Admin</option>
          <option value='TEACHER'>Giảng viên</option>
          <option value='STUDENT'>Sinh viên</option>
        </select>
      </td>
      <td scope='col' className='p-2'>
        <input
          type='text'
          value={searchParam.full_name}
          name='full_name'
          onChange={handleOnChangeSearchUser}
          className='flex-1 rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
      <td scope='col' className='p-2'>
        <input
          type='text'
          value={searchParam.phone}
          name='phone'
          onChange={handleOnChangeSearchUser}
          className='flex-1 rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
      <td scope='col' className='p-2'>
        <input
          type='text'
          value={searchParam.email}
          name='email'
          onChange={handleOnChangeSearchUser}
          className='flex-1 rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
      <td scope='col' className='p-2'>
        <input
          type='text'
          value={searchParam.address}
          name='address'
          onChange={handleOnChangeSearchUser}
          className='flex-1 rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
      <td scope='col' className='p-2'>
        <input
          type='text'
          name='gender'
          value={searchParam.gender}
          onChange={handleOnChangeSearchUser}
          className='rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
      <td scope='col' className='p-2'>
        <input
          type='date'
          value={searchParam.birthday_start}
          name='birthday_start'
          on
          onChange={handleOnChangeSearchUser}
          className='rounded-md  w-full px-2 py-2 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
        />
      </td>
    </tr>
  )
}

export default UserFilter
