import Filter from '../Filter/Filter'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { IoIosNuclear } from 'react-icons/io'
import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { axiosBase } from '../../../utils/api'
import { colHeader } from './colHeader'
import UserFilter from '../Filter/UserFilter'
import adminIcon from '../../../assets/images/icons/admin.png'
import teacherIcon from '../../../assets/images/icons/teacher.png'
import studentIcon from '../../../assets/images/icons/student.png'

const DataTables = () => {
  const token = localStorage.getItem('accessToken')

  const apiString = useLoaderData()
  const [dataState, setDataState] = useState([])
  const [pageIndex, setPageIndex] = useState(1) // số trang hiện tại
  const [pageSize, setPageSize] = useState(5) // tổng số bản ghi 1 trang
  const [totalPage, setTotalPage] = useState(0) // lưu tổng số trang
  const [newData, setNewData] = useState([]) // lưu data sau khi xử lý phân trang
  const [isSearch, setIsSearch] = useState(false)
  const [search, setSearch] = useState({
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

  const [searchParam, setSearchParam] = useState({
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

  // Get dữ liệu
  const getData = async () => {
    if (apiString === 'user') {
      const res = await axiosBase({
        url: `/api/admin/${apiString}`,
        params: {
          page_index: pageIndex - 1,
          page_size: pageSize,
          ...search,
        },
      })
      setDataState(res.data)
    } else {
      const res = await axiosBase({
        url: `https://training.bks.center/api/${apiString}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      setDataState(res.data)
    }
  }
  useEffect(() => {
    getData()
  }, [apiString, isSearch, pageSize, dataState.length])

  // Phân trang Pagination
  useEffect(() => {
    setPageIndex(1)
  }, [apiString])
  useEffect(() => {
    const dataLength = dataState.length // lấy ra tổng số bản ghi
    setTotalPage(Math.ceil(dataLength / pageSize)) // tính số trang và lưu vào state
    const startIndex = (pageIndex - 1) * pageSize // tính vị trí bắt đầu
    const endIndex = pageIndex * pageSize // tính vị trí kết thúc
    const value = dataState.slice(startIndex, endIndex) // dùng array.slice(start,end) tạo ra 1 mảng mới
    setNewData(value)
  }, [dataState, pageIndex, pageSize]) // [data, pageIndex, pageSize] bắt state thay đổi để lấy dữ liệu mới

  // Tìm kiếm
  const handleOnChangeSearch = (e) => {
    const key = e.target.name
    setSearch({ ...search, [key]: e.target.value })
  }

  const handleOnChangeSearchUser = (e) => {
    const key = e.target.name
    setSearchParam({ ...search, [key]: e.target.value })
  }

  const userSearch = async () => {
    const res = await axiosBase({
      url: `/api/admin/${apiString}`,
      params: {
        page_index: pageIndex - 1,
        page_size: pageSize,
        ...searchParam,
      },
    })
    setDataState(res.data)
  }

  const handleSearch = (keyData1, keyData2, searchValue1, searchValue2) => {
    if (search && search !== '') {
      const dataSearch = newData.filter((item) => {
        return searchValue2
          ? item[keyData1].toString().includes(searchValue1) &&
              item[keyData2].toString().includes(searchValue2)
          : item[keyData1].toString().includes(searchValue1)
      })
      setNewData(dataSearch)
    } else {
      const startIndex = (pageIndex - 1) * pageSize // tính vị trí bắt đầu
      const endIndex = pageIndex * pageSize // tính vị trí kết thúc
      const value = dataState.slice(startIndex, endIndex) // dùng array.slice(start,end) tạo ra 1 mảng mới
      setNewData(value)
    }
  }

  // Xóa dữ liệu
  const DeleteData = async (id) => {
    if (apiString !== 'user') {
      const res = await axiosBase({
        url: `api/${apiString}/${id}`,
        method: 'DELETE',
      })
      if (res) {
        alert('Xóa thành công')
        getData()
      }
    } else {
      const res = await axiosBase({
        url: `api/admin/${apiString}/${id}`,
        method: 'DELETE',
      })
      if (res) {
        alert('Xóa thành công')
        getData()
      }
    }
  }

  return (
    <>
      <Toolbar
        length={dataState.length}
        apiString={apiString}
        getData={getData}
      />
      <div className='relative overflow-x-auto px-5 w-full h-[600px]'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-slate-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 border border-slate-300 text-center w-4'
              >
                STT
              </th>
              <th
                scope='col'
                className='px-6 py-3 border border-slate-300 text-center w-1'
              >
                <IoIosNuclear className='w-6 h-6 mx-auto' />
              </th>
              {apiString === 'user' && (
                <th
                  scope='col'
                  className='px-1 py-1 border border-slate-300 text-center w-1'
                >
                  <div className='w-12 h-6 mx-auto'></div>
                </th>
              )}
              <th
                scope='col'
                className='px-6 py-3 border border-slate-300 text-center'
              >
                {apiString === 'field' && colHeader[0].col1}
                {apiString === 'course' && colHeader[1].col1}
                {apiString === 'class' && colHeader[2].col1}
                {apiString === 'user' && colHeader[3].col1}
              </th>
              <th
                scope='col'
                className='px-6 py-3 border border-slate-300 text-center'
              >
                {apiString === 'field' && colHeader[0].col2}
                {apiString === 'course' && colHeader[1].col2}
                {apiString === 'class' && colHeader[2].col2}
                {apiString === 'user' && colHeader[3].col2}
              </th>
              {apiString === 'user' && (
                <>
                  <th
                    scope='col'
                    className='px-6 py-3 border border-slate-300 text-center'
                  >
                    {colHeader[3].col3}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 border border-slate-300 text-center'
                  >
                    {colHeader[3].col4}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 border border-slate-300 text-center'
                  >
                    {colHeader[3].col5}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 border border-slate-300 text-center'
                  >
                    {colHeader[3].col6}
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {apiString === 'user' ? (
              <UserFilter
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                setIsSearch={setIsSearch}
                isSearch={isSearch}
                handleOnChangeSearchUser={handleOnChangeSearchUser}
                userSearch={userSearch}
              />
            ) : (
              <Filter
                apiString={apiString}
                search={search}
                setSearch={setSearch}
                setIsSearch={setIsSearch}
                isSearch={isSearch}
                handleOnChangeSearch={handleOnChangeSearch}
                handleSearch={handleSearch}
              />
            )}
            {newData.map((data, index) => (
              <tr key={data.id} className='bg-white border-b hover:bg-gray-50'>
                <td className='px-1 py-2 text-center border border-slate-300 text-gray-900'>
                  {index + 1}
                </td>
                <td className='px-2 py-2 border border-slate-300'>
                  <div className='flex text-xl gap-3'>
                    <Link to={`/admin/${apiString}/${data.id}`}>
                      <button className='border rounded-xl p-1 text-black hover:bg-blue-400 hover:text-white'>
                        <AiOutlineEdit />
                      </button>
                    </Link>
                    <button
                      className='border rounded-xl p-1 text-black hover:bg-red-400 hover:text-white'
                      onClick={() => DeleteData(data.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>

                {apiString === 'user' ? (
                  apiString !== 'class' && data.type && data.type !== '' ? (
                    (data.type === 'ADMIN' && (
                      <td
                        scope='row'
                        className='font-medium text-gray-900 border border-slate-300'
                      >
                        <img
                          src={adminIcon}
                          alt='Admin Icon'
                          className='w-6 h-5 mx-auto fill-blue-500'
                        />
                      </td>
                    )) ||
                    (data.type === 'TEACHER' && (
                      <td
                        scope='row'
                        className='font-medium text-gray-900 border border-slate-300'
                      >
                        <img
                          src={teacherIcon}
                          alt='Admin Icon'
                          className='w-6 h-5 mx-auto fill-blue-500'
                        />
                      </td>
                    )) ||
                    (data.type === 'STUDENT' && (
                      <td
                        scope='row'
                        className='font-medium text-gray-900 border border-slate-300'
                      >
                        <img
                          src={studentIcon}
                          alt='Admin Icon'
                          className='ws-6 h-5 mx-auto fill-blue-500'
                        />
                      </td>
                    ))
                  ) : (
                    <td></td>
                  )
                ) : null}

                <td
                  scope='row'
                  className='px-2 py-3 text-sm text-gray-900 border border-slate-300 text-center'
                >
                  {apiString === 'field' && data.code}
                  {apiString === 'course' && data.name}
                  {apiString === 'class' && data.name}
                  {apiString === 'user' && data.fullName}
                </td>
                <td className='px-2 py-3 text-sm border text-gray-900 border-slate-300 text-center'>
                  {apiString === 'field' && data.name}
                  {apiString === 'course' && data.year}
                  {apiString === 'class' && data.courseId}
                  {apiString === 'user' && data.phone}
                </td>
                {apiString === 'user' && (
                  <>
                    <td
                      scope='row'
                      className='px-2 py-3 text-sm text-gray-900 border border-slate-300 text-center'
                    >
                      {data.email}
                    </td>
                    <td className='px-2 py-3 text-sm border text-gray-900 border-slate-300 text-center'>
                      {data.address}
                    </td>
                    <td className='px-2 py-3 text-sm border text-gray-900 border-slate-300 text-center'>
                      {(data.gender === 0 && 'Nam') ||
                        (data.gender === 0 && 'Nữ') ||
                        (data.gender === 2 && 'Khác')}
                    </td>
                    <td className='px-2 py-3 text-sm border text-gray-900 border-slate-300 text-center'>
                      {data.birthday}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className='flex items-center justify-end py-3 gap-6'
        aria-label='Table navigation'
      >
        <span className='text-sm font-normal text-gray-500'>
          {totalPage > 0 ? pageIndex : '0'}/{totalPage} trang
        </span>
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <button
              type='button'
              className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700dark:hover:text-white ${
                pageIndex == 1 &&
                'pointer-events-none ,select-none, bg-gray-100 opacity-50'
              }`}
              onClick={() => {
                pageIndex >= 1 && setPageIndex(pageIndex - 1)
              }}
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>

          <li>
            <button
              type='button'
              className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700dark:hover:text-white ${
                pageIndex == totalPage &&
                'pointer-events-none ,select-none, bg-gray-100 opacity-50'
              }`}
              onClick={() => {
                pageIndex < totalPage && setPageIndex(pageIndex + 1)
              }}
            >
              <span className='sr-only'>Next</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>
          <li>
            <div className='border py-1 px-2 ml-3 rounded-lg'>
              <select
                onChange={(e) => {
                  setPageSize(e.target.value)
                  setPageIndex(1)
                }}
              >
                <option value={5}>5/trang</option>
                <option value={10}>10/trang</option>
                <option value={15}>15/trang</option>
                <option value={20}>20/trang</option>
              </select>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet context={{ apiString, getData }} />
    </>
  )
}

export default DataTables
