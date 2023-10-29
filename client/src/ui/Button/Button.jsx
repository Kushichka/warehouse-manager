import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from './button.module.scss';

export const Button = ({ name, color, type, loading, clickHandler }) => {
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

Button.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func
}

Button.defaultProps = {
    type: 'button',
    loading: false,
    clickHandler: null
}
