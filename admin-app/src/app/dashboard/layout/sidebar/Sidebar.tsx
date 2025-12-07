import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import SidebarContent from './Sidebaritems'
import SimpleBar from 'simplebar-react'
import { Icon } from '@iconify/react'
import FullLogo from '../shared/logo/FullLogo'
import { Button } from '@/components/ui/button'
import {
  AMLogo,
  AMMenu,
  AMMenuItem,
  AMSidebar,
  AMSubmenu,
} from 'tailwind-sidebar'
import 'tailwind-sidebar/styles.css'

const renderSidebarItems = (
  items: any[],
  currentPath: string,
  onClose?: () => void,
  isSubItem: boolean = false
) => {
  return items.map((item, index) => {
    const isSelected = currentPath === item?.url
    const IconComp = item.icon || null

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} />
    ) : (
      <Icon icon={'ri:checkbox-blank-circle-line'} height={9} width={9} />
    )

    // Heading
    if (item.heading) {
      return (
        <div className='mb-1' key={item.heading}>
          <AMMenu
            subHeading={item.heading}
            ClassName='hide-menu leading-21 text-charcoal font-bold uppercase text-xs dark:text-darkcharcoal'
          />
        </div>
      )
    }

    // Submenu
    if (item.children?.length) {
      return (
        <AMSubmenu
          key={item.id}
          icon={iconElement}
          title={item.name}
          ClassName='mt-1.5 text-link dark:text-darklink'>
          {renderSidebarItems(item.children, currentPath, onClose, true)}
        </AMSubmenu>
      )
    }

    // Regular menu item
    const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self'

    const itemClassNames = isSubItem
      ? `mt-1.5 text-link dark:text-darklink !hover:bg-transparent ${isSelected ? '!bg-transparent !text-primary' : ''
      } !px-1.5 `
      : `hover:bg-lightprimary! hover:text-primary! mt-1.5 text-link dark:text-darklink ${isSelected ? '!bg-lightprimary !text-primary !hover-bg-lightprimary' : ' '}`

    return (
      <div
        onClick={onClose}
        key={`${item.id || index}-${index}`}
      >
        <AMMenuItem
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          badge={!!item.isPro}
          badgeColor='bg-lightsecondary'
          badgeTextColor='text-secondary'
          disabled={item.disabled}
          badgeContent={item.isPro ? 'Pro' : undefined}
          component={Link}
          className={`${itemClassNames}`}>
          <span className='truncate flex-1'>{item.title || item.name}</span>
        </AMMenuItem>
      </div>
    )
  })
}

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()
  const { theme } = useTheme()

  // Only allow "light" or "dark" for AMSidebar
  const sidebarMode = theme === 'light' || theme === 'dark' ? theme : undefined

  return (
    <AMSidebar
      collapsible='none'
      animation={true}
      showProfile={false}
      width={'270px'}
      showTrigger={false}
      mode={sidebarMode}
      className='fixed left-0 top-0 xl:top-0 border-none bg-background z-10 h-screen'>
      {/* Logo */}
      <div className="px-4 flex items-start gap-6 brand-logo overflow-hidden pt-4">
        {/* Logo 1 */}
        <div className="flex flex-col items-center -ml-2">
          <img
            src="/images/logos/beehivedrones.jpg"
            alt="BeehiveDrones"
            className="h-12 w-auto"
          />
          <span className="text-xs mt-1 text-gray-500">Beehive Drones</span>
        </div>

        {/* Logo 2 */}
        <div className="flex flex-col items-center -ml-2">
          <img
            src="/images/logos/lumbungmuncul.jpg"
            alt="LumbungMuncul"
            className="h-12 w-auto"
          />
          <span className="text-xs mt-1 text-gray-500">Lumbung Muncul</span>
        </div>
      </div>


      {/* Sidebar items */}

      <SimpleBar className='h-[calc(100vh-170px)]'>
        <div className='px-6'>
          {SidebarContent.map((section, index) => (
            <div key={index}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                onClose
              )}
            </div>
          ))}

         
        </div>
      </SimpleBar>
    </AMSidebar>
  )
}

export default SidebarLayout
