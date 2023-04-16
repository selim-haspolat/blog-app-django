import {Navigate, Outlet} from 'react-router-dom'

const PrivateRouterAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") as string) || null;
    return !user ? <Outlet/> : <Navigate to={'/'}/>
}

export default PrivateRouterAuth