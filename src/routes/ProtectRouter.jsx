import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProtectRouter = ({ children }) => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const token = localStorage.getItem('accessToken')
  const checkAuth = () => {
    if (!token || token === 'null') {
      alert('Bạn chưa đăng nhập! Hãy đăng nhập để truy cập tiếp !!!')
      navigate('/')
    } else setIsAuth(!isAuth)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <>{isAuth ? children : null}</>
}

export default ProtectRouter
