import { useEffect, useState } from 'react';

import style from './button.module.scss';

export const Button = ({ name, color, type='button', loading=false, clickHandler=null }) => {
    const [isLoading, setIsLoading] = useState(false);
    const styles = isLoading ? style.disabled : style[color];

    useEffect(() => {
        loading ? setIsLoading(true) : setIsLoading(false);

    }, [loading]);

    return (
        <button className={styles} type={type} disabled={isLoading} onClick={clickHandler}>
            {name}
        </button>
    )
}
