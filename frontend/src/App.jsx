import { Routes, Route, Navigate } from "react-router-dom"

import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import HomePage from "./pages/home/HomePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanels"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./components/common/LoadingSpinner"

function App() {
  const { data: authUser, isLoading, error, isError } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if(data.error) return null; // To prevent undefined for AuthUser
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        console.log('authUser is here:', data)

        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    // Eliminate the windows to reload the page
    retry: false
  })

  if (isLoading) {
    return (<div className="h-screen flex justify-center items-center"><LoadingSpinner size='lg' /></div>
    )
  }

  console.log('authUser is here', authUser)  // stated as undefined

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common component, bc its not wrapped with Routes */}
      {authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
