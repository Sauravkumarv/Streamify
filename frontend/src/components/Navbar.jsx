import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation, isLoading } = useLogout();

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 h-full'>
        <div className='flex items-center justify-between w-full h-full'>
          
          {/* Logo - Hidden on large screens unless on chat page, always visible on mobile */}
          <div className={`${isChatPage ? 'block' : 'block lg:hidden'}`}>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-opacity'>
              <ShipWheelIcon className='size-8 sm:size-9 text-primary' aria-hidden="true" />
              <span className='text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                Streamify
              </span>
            </Link>
          </div>
          
          {/* Right side actions */}
          <div className='flex items-center gap-2 sm:gap-3 ml-auto'>
            {/* Notifications */}
            <Link to="/notification" aria-label="View notifications">
              <button className='btn btn-ghost btn-circle'>
                <BellIcon className='h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70' />
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* User Avatar */}
            {authUser && (
              <div className='avatar' title={authUser.name || 'User profile'}>
                <div className="w-8 sm:w-9 rounded-full ring-2 ring-base-300">
                  <img 
                    src={authUser.profilePic} 
                    alt={`${authUser.name || 'User'}'s avatar`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=User';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button 
              className='btn btn-ghost btn-circle' 
              onClick={logoutMutation}
              disabled={isLoading}
              aria-label="Logout"
            >
              {isLoading ? (
                <span className="loading loading-spinner h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <LogOutIcon className='h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70' />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar