import Section from './Section'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function AccountLayout() {
  return (
    <Section>
      <div className='flex w-full'>
        <AccountSideBar />
        <Outlet />
      </div>
    </Section>
  )
}


function AccountSideBar() {
  const { logout} = useAuth()
  return (
    <div className='flex flex-col'>
        <NavLink to="/account">Profile</NavLink>
        <Button onClick={() => logout()}>logout</Button>
    </div>
  )
}