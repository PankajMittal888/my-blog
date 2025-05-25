import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protect({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(store => store.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && authStatus !== true) {
            navigate('/login');
        } else if (!authentication && authStatus !== false) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-semibold animate-pulse">Loading...</h1>
        </div>
    ) : (
        <>{children}</>
    );
}

export default Protect;
