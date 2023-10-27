import { useEffect, useRef, useState } from "react"

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
}
