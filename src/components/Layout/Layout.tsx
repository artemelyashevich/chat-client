import React from 'react'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useAppSelector } from '../../hooks'

const Layout: React.FC = () => {
    const {token, loading} = useAppSelector(store => store.user)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (token === undefined || !token) {
        return (
            <Navigate to={"/auth"} replace />
        )
    }

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout