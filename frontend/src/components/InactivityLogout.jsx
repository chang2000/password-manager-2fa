import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const InactivityLogout = () => {
    const [inactiveTimer, setInactiveTimer] = useState(null);
    const [warningTimer, setWarningTimer] = useState(null);
    const [warningShown, setWarningShown] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const logoutUser = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('passkey');
        navigate('/');
    };

    const showWarning = () => {
        if (!warningShown) {
            setWarningShown(true);
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
        clearTimeout(inactiveTimer);
        clearTimeout(warningTimer);
        setWarningShown(false); // Reset the warning shown status
        setWarningTimer(setTimeout(showWarning, 25000)); // Show warning after 25 seconds
        setInactiveTimer(setTimeout(logoutUser, 30000)); // Logout after 30 seconds
    };

    useEffect(() => {
        // Set up event listeners for keyboard and mouse activity
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('click', resetTimer);

        // Initialize the timers
        resetTimer();

        // Clean up
        return () => {
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('click', resetTimer);
            clearTimeout(inactiveTimer);
            clearTimeout(warningTimer);
        };
    }, []);

    return null;
};

export default InactivityLogout;
