import React from 'react'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useAppSelector } from '../../hooks'
import LeftBar from "./LeftBar.tsx"

const Layout: React.FC = () => {
    const { loading, isAuth } = useAppSelector(store => store.auth)

    if (loading) {
        return (
            <React.Fragment>Loading...</React.Fragment>
        )
    }

    if (!isAuth) {
        return (
            <Navigate to={"/auth"} replace />
        )
    }

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <LeftBar />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout