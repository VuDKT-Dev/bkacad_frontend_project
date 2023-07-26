import { useState } from 'react'
import Input from '../Input'
import adminIcon from '../../../assets/images/icons/admin.png'
import teacherIcon from '../../../assets/images/icons/teacher.png'
import studentIcon from '../../../assets/images/icons/student.png'
import camera from '../../../assets/images/icons/camera.png'
import defaultAvatar from '../../../assets/images/defaultAvatar.png'
import { axiosBase } from '../../../utils/api'

const UsersModal = ({ setModalToggle, getData, apiString }) => {
  const [userParam, setUserParam] = useState({
    address: '',
    avatar: '',
    birthday: '',
    classId: 0,
    courseId: 0,
    email: '',
    enabled: true,
    fieldId: 0,
    fullName: '',
    gender: 0,
    note: '',
    phone: '',
    studentCode: '',
    teacherType: false,
    type: '',
    username: '',
  })
  const [isChoose, setIsChoose] = useState(true)

  // create a preview as a side effect, whenever selected file is changed
  const [image, setImage] = useState()
  const [previewImg, setPreViewImg] = useState()

  const imageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      const urlImage = URL.createObjectURL(event.target.files[0])
      setPreViewImg(urlImage)
      setImage(img)
    }
  }

  const createNewData = async () => {
    const formData = new FormData()
    formData.append('upload', image)
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
        url: `api/admin/${apiString}`,
        method: 'POST',
        data: newData,
      })
      if (res) {
        alert('Tạo thành công')
        setModalToggle(false)
        getData()
      }
    }
  }

  console.log(userParam)
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-gray-200 bg-opacity-70'>
      {isChoose ? (
        <div className='w-[850px] h-[237px] bg-white shadow-2xl absolute top-[100px] left-1/2 -translate-x-1/2 px-9'>
          <div className='flex justify-between'>
            <p className='py-5'>Thêm thành viên</p>
            <p className='py-5' onClick={() => setModalToggle(false)}>
              x
            </p>
          </div>
          <div className='flex gap-[80px] items-center justify-center py-[50px]'>
            <div className='flex gap-3'>
              <input
                type='radio'
                name='rdoRoll'
                value='ADMIN'
                onChange={(e) => {
                  setUserParam({ ...userParam, type: e.target.value })
                }}
              />
              <img src={adminIcon} alt='Admin Icon' width={25} height={15} />
              Quản lý
            </div>
            <div className='flex gap-3'>
              <input
                type='radio'
                name='rdoRoll'
                value='TEACHER'
                onChange={(e) => {
                  setUserParam({ ...userParam, type: e.target.value })
                }}
              />
              <img
                src={teacherIcon}
                alt='Teacher Icon'
                width={25}
                height={15}
              />{' '}
              Giảng viên
            </div>
            <div className='flex gap-3'>
              <input
                type='radio'
                name='rdoRoll'
                value='STUDENT'
                onChange={(e) => {
                  setUserParam({ ...userParam, type: e.target.value })
                }}
              />
              <img
                src={studentIcon}
                alt='Student Icon'
                width={15}
                height={15}
              />
              Sinh viên
            </div>
          </div>
          <div>
            <button
              type='button'
              className='float-right text-white hover:text-white border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-1 mr-4 ml-2 text-center '
              onClick={() => setIsChoose(!isChoose)}
            >
              Tiếp tục
            </button>
            <button
              type='button'
              className='float-right text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-1  text-center '
              onClick={() => setModalToggle(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-gray-200 bg-opacity-70'>
          <div className='w-[850px] h-[770px] bg-white shadow-2xl absolute top-[20px] left-1/2 -translate-x-1/2'>
            <div className='flex items-center justify-between px-9'>
              <p>
                Thêm
                {(userParam.type === 'ADMIN' && ' quản lý') ||
                  (userParam.type === 'TEACHER' && ' giảng viên') ||
                  (userParam.type === 'STUDENT' && ' sinh viên ')}
              </p>
              <p className='py-4' onClick={() => setModalToggle(false)}>
                x
              </p>
            </div>
            <div className='flex border-t'>
              <div className='w-1/2 px-14'>
                <div className='relative mt-[25px]'>
                  <img
                    src={previewImg ? previewImg : defaultAvatar}
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
                  value={userParam.fullName}
                  placeholder='Nhập họ và tên'
                  onChange={(e) =>
                    setUserParam({ ...userParam, fullName: e.target.value })
                  }
                />
                <Input
                  type='text'
                  label='Ngày sinh'
                  id='birth'
                  value={userParam.birthday}
                  onMouseOver={(e) => (e.target.type = 'date')}
                  onChange={(e) => {
                    setUserParam({
                      ...userParam,
                      birthday: e.target.value,
                    })
                  }}
                  placeholder='Chọn ngày sinh'
                />
                <Input
                  type='email'
                  label='Email'
                  id='email'
                  value={userParam.email}
                  placeholder='Nhập email'
                  onChange={(e) =>
                    setUserParam({ ...userParam, email: e.target.value })
                  }
                />
              </div>
              <div className='w-1/2 px-9'>
                <Input
                  type='text'
                  require
                  label=' Tài khoản'
                  marginTopZero
                  id='username'
                  value={userParam.username}
                  placeholder='Nhập tài khoản'
                  onChange={(e) =>
                    setUserParam({ ...userParam, username: e.target.value })
                  }
                  className='mt-0'
                />
                <Input
                  type='password'
                  require
                  label=' Mật khẩu'
                  id='password'
                  value={userParam.password}
                  placeholder='Nhập tài khoản'
                  onChange={(e) =>
                    setUserParam({ ...userParam, password: e.target.value })
                  }
                />
                <div className='flex mt-10 mb-7 text-sm'>
                  <label htmlFor='rdoGender'>Giới tính</label>
                  <input
                    type='radio'
                    name='rdoGender'
                    value='0'
                    onChange={(e) =>
                      setUserParam({ ...userParam, gender: e.target.value })
                    }
                    className='mx-5'
                  />
                  <span> Nam</span>
                  <input
                    type='radio'
                    name='rdoGender'
                    value='1'
                    onChange={(e) =>
                      setUserParam({ ...userParam, gender: e.target.value })
                    }
                    className='mx-5'
                  />
                  <span> Nữ</span>
                  <input
                    type='radio'
                    name='rdoGender'
                    value='2'
                    onChange={(e) =>
                      setUserParam({ ...userParam, gender: e.target.value })
                    }
                    className='mx-5'
                  />
                  <span> Khác</span>
                </div>
                <Input
                  type='text'
                  label='Số điện thoại'
                  id='phonenumber'
                  value={userParam.phone}
                  placeholder='Nhập tài khoản'
                  onChange={(e) =>
                    setUserParam({ ...userParam, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='mx-14 border-b'>
              <Input
                type='text'
                label='Địa chỉ'
                id='address'
                value={userParam.address}
                placeholder='Nhập địa chỉ'
                onChange={(e) =>
                  setUserParam({ ...userParam, address: e.target.value })
                }
              />
            </div>
            <div className='px-14 border-b mt-4 pb-4'>
              <label htmlFor='note'> Ghi chú</label>
              <textarea
                rows={4}
                label='Ghi chú'
                id='note'
                value={userParam.note}
                placeholder='Nhập ghi chú'
                className='border w-full'
                onChange={(e) =>
                  setUserParam({ ...userParam, note: e.target.value })
                }
              />
            </div>
            <div className='mx-2 mt-2'>
              <button
                type='button'
                className='float-right text-white hover:text-white border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-3 mr-4 ml-2 text-center '
                onClick={createNewData}
              >
                Thêm
              </button>
              <button
                type='button'
                className='float-right text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 my-3  text-center '
                onClick={() => setModalToggle(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersModal
