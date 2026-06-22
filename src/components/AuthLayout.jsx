import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({
    children,
    authentication = true               // this tells whether a page requires Safety / Protection or not.
}) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {        
        if (authentication && authStatus !== true) {            // 1. If page needs login, but user is NOT logged in.
            navigate("/login");
        } 
        else if (!authentication && authStatus === true) {      // 2. If page is for guests, but user IS logged in.
            navigate("/");
        } 
        else {                                          // 3. If everything is fine, stop loading and show the page.
            setLoading(false);
        }
    }, [authStatus, navigate, authentication])

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected
