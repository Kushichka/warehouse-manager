import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types';

export const useClickOutside = (state) => {
    const [open, setOpen] = useState(state);
    const ref = useRef(null);

    const toggle = () => setOpen(!open);

    useEffect(() => {
        const clickOutsideHandler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', clickOutsideHandler);

        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
        }
    }, []);

    return { ref, toggle, open };
};

useClickOutside.propTypes = {
    state: PropTypes.bool.isRequired
}

useClickOutside.defaultProps = {
    state: false
}

