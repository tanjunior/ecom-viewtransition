import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function AccountLayout() {
  return (
    <div className='flex w-full'>
      <AccountSideBar />
      <Outlet />
    </div>
  )
}


function AccountSideBar() {
  const { logout} = useAuth()
  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
        <NavLink to="/account">Profile</NavLink>
        <Button onClick={() => {
          navigate("/")
          logout()
        }}>logout</Button>
    </div>
  )
}