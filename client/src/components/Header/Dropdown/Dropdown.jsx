import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../../../hooks/useLogout';

import style from './dropdown.module.scss';

const data = [
    { name: 'Profile', type: 'link', link: '/profile' },
    { name: 'Logout', type: 'button' }
];

export const Dropdown = forwardRef((_, ref) => {
    const userLogout = useLogout();

    const handleLogout = (e) => {
        e.preventDefault();

        userLogout();
    };

    const items = data.map((item) => {
        if (item.type === 'button') {
            return (
                <li key={item.name}>
                    <button className={style.dropdown_item_button} onClick={handleLogout}>
                        {item.name}
                    </button>
                </li>
            )
        } else {
            return (
                <Link to={item.link} key={item.name}>
                    <li className={style.dropdown_item}>
                        {item.name}
                    </li>
                </Link>
            )
        }
    });

    return (
        <div className={style.dropdown} ref={ref}>
            <ul className={style.dropdown_list}>

                {items}

            </ul>
        </div>
    )
});
