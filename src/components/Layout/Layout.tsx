import React from 'react'
import Header from './Header'
import {Navigate, Outlet} from 'react-router-dom'
import Footer from './Footer'
import {useAppSelector} from '../../hooks'

const Layout: React.FC = () => {
    const {loading, isAuth} = useAppSelector(store => store.auth)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    console.log(isAuth)

    if (!isAuth) {
        return (
            <Navigate to={"/auth"} replace/>
        )
    }

    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout