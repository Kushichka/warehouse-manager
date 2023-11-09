import { useEffect } from "react"
import PropTypes from 'prop-types';

export const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const clickHandler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
               callback();
            }
        };

        document.addEventListener('mousedown', clickHandler);

        return () => {
            document.removeEventListener('mousedown', clickHandler);
        }
    }, [ref, callback]);
};

useClickOutside.propTypes = {
    ref: PropTypes.element.isRequired,
    callback: PropTypes.func.isRequired
}

