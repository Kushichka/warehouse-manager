import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import style from './dropdown.module.scss';

const data = [
    { name: 'Profile', link: '/profile' },
    { name: 'Logout', link: '/logout' }
];

export const Dropdown = forwardRef((_, ref) => {
    const items = data.map(({ name, link }) => (
        <Link to={link} key={name}>
            <li className={style.dropdown_item}>
                {name}
            </li>
        </Link>
    ));

    return (
        <div className={style.dropdown} ref={ref}>
            <ul className={style.dropdown_list}>

                {items}

            </ul>
        </div>
    )
});
