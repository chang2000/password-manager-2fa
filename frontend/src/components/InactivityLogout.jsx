import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const InactivityLogout = () => {
    const inactiveTimer = useRef(null);
    const warningTimer = useRef(null);
    const warningShownRef = useRef(false);
    const navigate = useNavigate();
    const toast = useToast();

    const logoutUser = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('passkey');
        navigate('/');
    };

    const showWarning = () => {
        if (!warningShownRef.current) {
            warningShownRef.current = true;
            toast({
                title: 'Inactivity detected',
                description: 'You will be logged out in 5 seconds due to inactivity',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const resetTimer = () => {
        clearTimeout(inactiveTimer.current);
        clearTimeout(warningTimer.current);
        warningShownRef.current = false;
        warningTimer.current = setTimeout(showWarning, 25000);
        inactiveTimer.current = setTimeout(logoutUser, 30000);
    };

    useEffect(() => {
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('click', resetTimer);
        resetTimer();
        return () => {
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('click', resetTimer);
            clearTimeout(inactiveTimer.current);
            clearTimeout(warningTimer.current);
        };
    }, []);

    return null;
};

export default InactivityLogout;