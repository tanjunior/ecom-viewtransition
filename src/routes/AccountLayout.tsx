import Section from './Section'
import { Outlet } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

export default function AccountLayout() {
  return (
    <Section>
      <div className='flex'>
        <AccountSideBar />
        <Outlet />
      </div>
    </Section>
  )
}


function AccountSideBar() {
  const {logout} = useAuth()
  return (
    <div className='flex flex-col'>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li onClick={() => logout()}>logout</li>
      </ul>
    </div>
  )
}