import { Outlet } from 'react-router-dom'

// components
import Header from '../../components/layout/Header'

// contexts
import SchemaContextSection from '../../contexts/SchemaContextSection'

function MainPage() {
  return (
    <div className="w-screen min-h-screen min-w-[1052px] bg-secondary-blue-100 flex flex-col">
      <Header />
      <SchemaContextSection>
        <div className="flex-1 flex h-full pt-20 overflow-y-auto">
          <Outlet />
        </div>
      </SchemaContextSection>
    </div>
  )
}

export default MainPage
