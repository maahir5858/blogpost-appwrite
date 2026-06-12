import { useState, useEffect } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice'
import authService from './appwrite/auth';
import { Header, Footer } from './components'

function App() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({userData}));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (loading) ? (<h1>Loading...</h1>) : (
        <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
            <div className='w-full block'>
                <Header />
                {/* <Outlet /> */}
                <Footer />
            </div>
        </div>
    )
}

export default App
