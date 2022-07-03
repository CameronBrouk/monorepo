import { BrowserRouter } from 'react-router-dom'
import type { Story } from '@ladle/react'
import { FullPageContent as FullPageContentComponent } from '../components/FullPageLayout/FullPageContent'
import { FullPageHeader as FullPageHeaderComponent } from '../components/FullPageLayout/FullPageHeader'
import {
  FullPageSidebar as FullPageSidebarComponent,
  SidebarSection as SidebarSectionComponent
} from '../components/FullPageLayout/FullPageSidebar'

export const FullPageLayout: Story<any> = (props) => {
  return (
    <BrowserRouter>
      <div className='w-full bg-gray-200 h-screen'>
        <FullPageHeaderComponent
          breadcrumbs={[{ title: 'First Route' }, { title: 'Current' }]}
        ></FullPageHeaderComponent>

        <FullPageContentComponent>
          <FullPageSidebarComponent>
            <SidebarSectionComponent title='Sidebar 1'>
              test
            </SidebarSectionComponent>

            <SidebarSectionComponent title='Sidebar 2'>
              test
            </SidebarSectionComponent>
          </FullPageSidebarComponent>
        </FullPageContentComponent>
      </div>
    </BrowserRouter>
  )
}
