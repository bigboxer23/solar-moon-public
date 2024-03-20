import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { LuSun } from 'react-icons/lu';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import logo from '../../assets/logo.svg';

// TODO: break this up, it's a mess (break out the slider menu at least)
export default function Navbar() {
  const match = useMatch('/docs/*') !== null;
  const separatorStyle =
    'text-text-secondary dark:text-brand-secondary text-lg text-decoration-none font-bold hidden lg:block';
  const linkStyle =
    'text-black dark:text-gray-100 font-bold text-lg text-decoration-none';
  const activeLinkStyle =
    'text-black dark:text-gray-100 font-bold text-lg border-b-2 border-text-primary text-decoration-none border-black dark:border-gray-100';

  const slideMenuLinkStyle =
    'text-start text-black font-bold text-2xl text-decoration-none w-fit';
  const slideMenuActiveLinkStyle =
    'text-black dark:text-gray-100 font-bold text-2xl border-b-2 border-text-primary text-decoration-none border-black w-fit';

  const [slideMenuOpen, setSlideMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => {
    if (slideMenuOpen) {
      setSlideMenuOpen(false);
    }
  });

  const location = useLocation();

  useEffect(() => {
    setSlideMenuOpen(false);
  }, [location]);

  function getPageName(location) {
    const path = location.pathname;
    const pathArray = path.split('/');

    switch (pathArray[1]) {
      case '':
        return 'Home';
      case 'docs':
        return 'Docs';
      case 'pricing':
        return 'Pricing';
      case 'about':
        return 'About';
      case 'tos':
        return 'Terms Of Service';
      case 'privacy':
        return 'Privacy Policy';
      default:
        return '';
    }
  }

  return (
    <>
      <div className='Navbar flex h-[4.5rem] w-full items-center justify-between border-b border-text-secondary bg-brand-primary-light sm:h-[6.25rem] dark:border-b-0 dark:bg-gray-950 dark:text-gray-100'>
        <NavLink className='flex items-center justify-center' to='/'>
          <img
            alt='brand'
            className='ml-6 size-10 sm:ml-8 sm:size-12'
            src={logo}
          />
          <span className='ms-2 text-base font-bold sm:text-xl'>
            Solar Moon Analytics{' '}
          </span>
        </NavLink>
        <div className='flex items-center justify-center sm:hidden'>
          <span className='text-xl font-bold text-black'>
            {getPageName(location)}
          </span>
        </div>
        <nav className='hidden items-center sm:flex sm:space-x-6 md:space-x-12 lg:space-x-10'>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            to='/'
          >
            Home
          </NavLink>
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            to='/docs'
          >
            Docs
          </NavLink>
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            to='/pricing'
          >
            Pricing
          </NavLink>
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            to='/about'
          >
            About
          </NavLink>
        </nav>
        {/* annoying hack because this thing has bizarre positioning */}
        <NavLink
          className='mr-8 hidden  items-center justify-center sm:flex'
          to='https://app.solarmoonanalytics.com'
        >
          Sign up /Sign In
        </NavLink>
        <div className='mr-6 flex items-center justify-center sm:hidden'>
          <FaBars className='text-2xl' onClick={() => setSlideMenuOpen(true)} />
        </div>
      </div>
      <div
        className={classNames(
          'NavbarSlideMenu fixed top-0 right-0 h-screen w-3/4 bg-white shadow-panel z-10 transition-all duration-300 ease-in-out pl-10 pt-6 pr-6',
          {
            'translate-x-0': slideMenuOpen,
            'translate-x-full': !slideMenuOpen,
          },
        )}
        ref={menuRef}
      >
        <div className='mb-4 flex w-full items-center justify-end'>
          <button onClick={() => setSlideMenuOpen(false)}>
            <FaXmark className='text-3xl' />
          </button>
        </div>
        <nav className='flex w-full flex-col space-y-8'>
          <NavLink
            className={({ isActive }) =>
              isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle
            }
            to='/'
          >
            Home
          </NavLink>
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle
            }
            to='/docs'
          >
            Docs
          </NavLink>
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/gettingStarted'
            >
              Getting Started
            </NavLink>
          )}
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/connectingDevice'
            >
              Connecting an Obvius device
            </NavLink>
          )}
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/connectingSMADevices'
            >
              Connecting SMA devices
            </NavLink>
          )}
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/sortingDevices'
            >
              Organizing devices
            </NavLink>
          )}
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/deviceData'
            >
              Understanding device data
            </NavLink>
          )}
          {match && (
            <NavLink
              className={({ isActive }) =>
                'ms-4 text-sm ' +
                (isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle)
              }
              to='/docs/mapping'
            >
              Mapping device data
            </NavLink>
          )}
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle
            }
            to='/pricing'
          >
            Pricing
          </NavLink>
          <LuSun className={separatorStyle} />
          <NavLink
            className={({ isActive }) =>
              isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle
            }
            to='/about'
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? slideMenuActiveLinkStyle : slideMenuLinkStyle
            }
            to='https://app.solarmoonanalytics.com'
          >
            Sign up /Sign In
          </NavLink>
        </nav>
      </div>
    </>
  );
}
