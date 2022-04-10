import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutComponent = () => {
    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login';
    }


    return <div className="header">
        <div>
            <LogoutIcon onClick={logout}/>
        </div>
    </div>
}
