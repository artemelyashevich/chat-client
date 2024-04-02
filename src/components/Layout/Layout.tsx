import React from 'react'
import Header from './Header'
import {Navigate, Outlet} from 'react-router-dom'
import Footer from './Footer'
import {useAppSelector} from '../../hooks'
import LeftBar from "./LeftBar.tsx"

const Layout: React.FC = () => {
    const {loading, isAuth} = useAppSelector(store => store.auth)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!isAuth) {
        return (
            <Navigate to={"/auth"} replace/>
        )
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <LeftBar/>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout