import { useEffect, useState } from 'react'
import { axiosBase } from '../../../utils/api'

const CategoriesModal = ({ apiString, setModalToggle, getData }) => {
  const [param, setParam] = useState({})
  const [newData, setNewData] = useState({
    input1: '',
    input2: '',
  })

  useEffect(() => {
    if (apiString === 'course') {
      return setParam({
        ...param,
        name: newData.input1,
        year: newData.input2,
      })
    }
    if (apiString === 'class') {
      return setParam({
        ...param,
        name: newData.input1,
        course_id: newData.input2,
      })
    }
    if (apiString === 'field') {
      return setParam({
        ...param,
        code: newData.input1,
        name: newData.input2,
      })
    }
  }, [apiString, newData])

  const createNewData = async () => {
    const res = await axiosBase({
      url: `api/${apiString}`,
      method: 'POST',
      params: param,
    })
    if (res) {
      alert('Tạo thành công')
      setModalToggle(false)
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
              className='block flex-1 rounded-lg mx-3 py-1 px-3 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
              value={newData.input1}
              onChange={(e) =>
                setNewData({
                  ...newData,
                  input1: e.target.value,
                })
              }
            />
            <label htmlFor='courseyear'>
              {(apiString === 'field' && 'Ngành nghề') ||
                (apiString === 'course' && 'Năm bắt đầu') ||
                (apiString === 'class' && 'Tên khóa')}
            </label>
            <input
              type='text'
              id='courseyear'
              className='block flex-1 rounded-lg py-1 px-3 mx-3 text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
              value={newData.input2}
              onChange={(e) =>
                setNewData({
                  ...newData,
                  input2: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <button
            type='button'
            className='float-right text-white hover:text-white border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-2 mr-4 ml-2 text-center '
            onClick={createNewData}
          >
            Thêm
            {(apiString === 'field' && 'ngành nghề') ||
              (apiString === 'course' && 'khóa') ||
              (apiString === 'class' && 'lớp')}
          </button>
          <button
            type='button'
            className='float-right text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-2  text-center '
            onClick={() => setModalToggle(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoriesModal
