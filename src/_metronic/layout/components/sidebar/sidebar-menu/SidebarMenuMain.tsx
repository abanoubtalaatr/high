/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
    <SidebarMenuItem
      to='/dashboard'
      icon='element-11'
      title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/partners'
      icon='user-tick'
      title={intl.formatMessage({id: 'PARTNERS'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/units'
      icon='cube-2'
      title={intl.formatMessage({id: 'UNITS'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/users'
      icon='people'
      title={intl.formatMessage({id: 'USERS'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/public-events'
      icon='people'
      title={intl.formatMessage({id: 'PUBLIC_EVENTS'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/bookings'
      icon='people'
      title={intl.formatMessage({id: 'BOOKINGS'})}
      fontIcon='bi-app-indicator'
    />
      <SidebarMenuItemWithSub
        to='/employees'
        title={intl.formatMessage({id: 'EMPLOYEES'})}
        fontIcon='bi-archive'
        icon='profile-user'
      >
          <SidebarMenuItem to='/employees/list' title={intl.formatMessage({id: 'EMPLOYEES'})} hasBullet={true} />
          <SidebarMenuItem to='/employees/jobs' title={intl.formatMessage({id: 'JOBS'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
      to='/financials'
      icon='wallet'
      title={intl.formatMessage({id: 'FINANCIALS'})}
      fontIcon='bi-app-indicator'
    />
    
      <SidebarMenuItem
      to='/wallet'
      icon='wallet'
      title={intl.formatMessage({id: 'WALLET'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItem
      to='/activites'
      icon='abstract-36'
      title={intl.formatMessage({id: 'ACTIVITIES'})}
      fontIcon='bi-app-indicator'
    />
    <SidebarMenuItemWithSub
        to='/setup-files'
        title={intl.formatMessage({id: 'SETUP_FILES'})}
        fontIcon='bi-archive'
        icon='some-files'
      >
          <SidebarMenuItem to='/setup-files/types' title={intl.formatMessage({id: 'TYPES'})} hasBullet={true} />
          <SidebarMenuItem to='/setup-files/capacities' title={intl.formatMessage({id: 'CAPACITIES'})} hasBullet={true} />
          <SidebarMenuItem to='/setup-files/services' title={intl.formatMessage({id: 'SERVICES'})} hasBullet={true} />
          <SidebarMenuItem to='/setup-files/age-groups' title={intl.formatMessage({id: 'AGE_GROUPS'})} hasBullet={true} />
          <SidebarMenuItem to='/setup-files/languages' title={intl.formatMessage({id: 'LANGUAGES'})} hasBullet={true} />
          <SidebarMenuItem to='/banks/list' title={intl.formatMessage({id: 'banks'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      
      <SidebarMenuItemWithSub
        to='/locations'
        title={intl.formatMessage({id: 'LOCATIONS'})}
        fontIcon='bi-archive'
        icon='geolocation'
      >
          <SidebarMenuItem to='/locations/countries' title={intl.formatMessage({id: 'COUNTRIES'})} hasBullet={true} />
          <SidebarMenuItem to='/locations/states' title={intl.formatMessage({id: 'STATES'})} hasBullet={true} />
          <SidebarMenuItem to='/locations/cities' title={intl.formatMessage({id: 'CITIES'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/notifications'
        title={intl.formatMessage({id: 'NOTIFICATIONS'})}
        fontIcon='bi-archive'
        icon='notification-bing'
      >
          <SidebarMenuItem to='/notifications/partners' title={intl.formatMessage({id: 'PARTNERS'})} hasBullet={true} />
          <SidebarMenuItem to='/notifications/users' title={intl.formatMessage({id: 'USERS'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/pages-content'
        title={intl.formatMessage({id: 'PAGES_CONTENT'})}
        fontIcon='bi-archive'
        icon='some-files'
      >
          <SidebarMenuItem to='/pages-content/pages' title={intl.formatMessage({id: 'PAGES'})} hasBullet={true} />
          <SidebarMenuItem to='/pages-content/help-center' title={intl.formatMessage({id: 'HELP_CENTER'})} hasBullet={true} />
      </SidebarMenuItemWithSub>      
    </>
  )
}

export {SidebarMenuMain}
