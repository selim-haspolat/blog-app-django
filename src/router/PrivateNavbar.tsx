import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateNavbar = () => {

    const {user} = useSelector((state:any) => state.auth)

  return user ? <Outlet/> : <Navigate to={`/login`}/>  
}

export default PrivateNavbar