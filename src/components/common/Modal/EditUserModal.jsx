import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { axiosBase } from '../../../utils/api'
import camera from '../../../assets/images/icons/camera.png'
import Input from '../Input'

const EditUserModal = () => {
  const { data } = useLoaderData()
  const { getData, apiString } = useOutletContext()
  const navigate = useNavigate()
  const [userParam, setUserParam] = useState(data)

  const getImgApi = async () => {
    const res = await axiosBase({
      url: `api/file/view/${data.avatar}`,
      method: 'GET',
      responseType: 'blob',
    })
    if (res) {
      const uri = URL.createObjectURL(res.data)
      setUserParam({ ...userParam, avatar: uri })
    }
  }

  const handleInputChange = (e) => {
    const key = e.target.name
    setUserParam({ ...userParam, [key]: e.target.value })
  }

  const [previewImg, setPreViewImg] = useState()

  const imageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      const urlImage = URL.createObjectURL(event.target.files[0])
      setPreViewImg(urlImage)
      setUserParam({ ...userParam, avatar: img })
    }
  }

  const updateUser = async (id) => {
    const formData = new FormData()
    formData.append('upload', userParam.avatar)
    const resImg = await axiosBase({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: '/api/file/upload',
      method: 'POST',
      data: formData,
    })
    if (resImg) {
      const newData = {
        ...userParam,
        avatar: resImg.data.pathOnServer,
      }
      const res = await axiosBase({
        url: `api/admin/user/${id}`,
        method: 'PUT',
        data: newData,
      })
      if (res) {
        alert('Sửa thành công')
        navigate(`/admin/user`)
        getData()
      }
    }
  }

  useEffect(() => {
    getImgApi()
  }, [])

  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-gray-200 bg-opacity-70'>
      <div className='w-[850px] h-[770px] bg-white shadow-2xl absolute top-[20px] left-1/2 -translate-x-1/2'>
        <div className='flex items-center justify-between px-9'>
          <p>Sửa</p>
          <p
            className='py-4 cursor-pointer'
            onClick={() => navigate('/admin/user')}
          >
            x
          </p>
        </div>
        <div className='flex border-t'>
          <div className='w-1/2 px-14'>
            <div className='relative mt-[25px]'>
              <img
                src={previewImg ? previewImg : userParam.avatar}
                alt='Defautl Avatar'
                width={124}
                height={124}
                className='border object-cover'
              />
              <label
                htmlFor='inputFile'
                className='absolute bottom-1 left-[90px] cursor-pointer'
              >
                <img src={camera} alt='Add Photo Icon' />
                <input
                  id='inputFile'
                  type='file'
                  className='hidden'
                  accept='.jpg, .jpeg, .png'
                  onChange={imageChange}
                />
              </label>
            </div>
            <Input
              type='text'
              label=' Họ và tên'
              require
              id='fullname'
              name='fullName'
              defaultValue={userParam.fullName}
              onChange={handleInputChange}
            />
            <Input
              type='date'
              label='Ngày sinh'
              id='birth'
              placeholder='Chọn ngày sinh'
              name='birthday'
              value={userParam.birthday}
              onChange={handleInputChange}
            />
            <Input
              type='email'
              label='Email'
              id='email'
              name='email'
              defaultValue={userParam.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='w-1/2 px-9'>
            <Input
              type='text'
              require
              label=' Tài khoản'
              marginTopZero
              id='username'
              className='mt-0'
              defaultValue={userParam.username}
              disable={userParam.usename}
            />

            <div className='flex mt-10 mb-7 text-sm'>
              <label htmlFor='rdoGender'>Giới tính</label>
              <input
                type='radio'
                name='gender'
                checked={userParam.gender === 0}
                value='0'
                className='mx-5'
                onChange={handleInputChange}
              />
              <span> Nam</span>
              <input
                type='radio'
                name='gender'
                checked={userParam.gender === 1}
                value='1'
                className='mx-5'
                onChange={handleInputChange}
              />
              <span> Nữ</span>
              <input
                type='radio'
                name='gender'
                checked={userParam.gender === 2}
                value='2'
                className='mx-5'
                onChange={handleInputChange}
              />
              <span> Khác</span>
            </div>
            <Input
              type='text'
              label='Số điện thoại'
              id='phonenumber'
              placeholder='Nhập tài khoản'
              name='phone'
              defaultValue={userParam.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mx-14 border-b'>
          <Input
            type='text'
            label='Địa chỉ'
            id='address'
            placeholder='Nhập địa chỉ'
            defaultValue={userParam.address}
            onChange={handleInputChange}
          />
        </div>
        <div className='px-14 border-b mt-4 pb-4'>
          <label htmlFor='note'> Ghi chú</label>
          <textarea
            rows={4}
            label='Ghi chú'
            id='note'
            placeholder='Nhập ghi chú'
            className='border w-full'
            name='note'
            defaultValue={userParam.note}
            onChange={handleInputChange}
          />
        </div>
        <div className='mx-2 flex flex-row-reverse items-center justify-start'>
          <button
            type='button'
            className=' text-white hover:text-white border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-3 mr-4 ml-2 text-center '
            onClick={() => updateUser(userParam.id)}
          >
            Cập nhật
          </button>
          <button
            type='button'
            className=' text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-2  text-center '
            onClick={() => navigate('/admin/user')}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal
