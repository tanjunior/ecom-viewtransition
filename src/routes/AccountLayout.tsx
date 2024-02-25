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

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

function AccountSideBar() {
  const { logout} = useAuth()
  const navigate = useNavigate()

  const className = ({isActive}: NavLinkRenderProps) => isActive ? "text-primary" : ""
  
  return (
    <div className='flex flex-col'>
        <NavLink to={`/account/profile`} className={className}>Profile</NavLink>
        <NavLink to={`/account/cart`} className={className}>Cart</NavLink>
        <Button onClick={() => {
          navigate("/")
          logout()
        }}>logout</Button>
    </div>
  )
}