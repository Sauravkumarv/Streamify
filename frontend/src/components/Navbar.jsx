import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
const {authUser}=useAuthUser();
const location=useLocation();
const isChatPage=location.pathname?.startsWith("/chat");

const{logoutMutation,isLoading,error}=useLogout();

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end w-full'>
          {/* logo only in the chat page */}

          {/* {isChatPage && (
            <div className='pl-5'>
              <Link to="/" className='flex items-center gap-2.5'>
                <ShipWheelIcon className='size-9 text-primary'/>
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
              </Link>

            </div>
          )} */}
          
          {/* Logo - Hidden on large screens unless on chat page, always visible on mobile */}
          <div className={`${isChatPage ? 'block' : 'block lg:hidden'}`}>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-opacity'>
              <ShipWheelIcon className='size-8 sm:size-9 text-primary' aria-hidden="true" />
              <span className='text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                Streamify
              </span>
            </Link>
          </div>




          
          <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
            <Link to="/notification">
              <button className='btn btn-ghost btn-circle'>
                <BellIcon className='h-6 w-6 text-base-content opacity-70'/>

              </button>
            </Link>

          </div>
          {/* todo */}
<ThemeSelector/>

<div className='avatar'>
  <div className="w-9 rounded-full"> 
  <img src={authUser?.profilePic} alt='user Avatar' rel='noreferrer'/>
  </div>

</div>
{/* logout button */}
<button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
  <LogOutIcon className='h-6 w-6 text-base-content opacity-70'/>
</button>
        </div>
      </div>

   
      
    </nav>
  )
}

export default Navbar
