import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '../../ui/ErrorMessage/ErrorMessage';
import { Button } from '../../ui/Button/Button';
import { Dropdown } from './Dropdown/Dropdown';
import { InfoBar } from './InfoBar/InfoBar';
import { useClickOutside } from '../../hooks/useClickOutside';

import style from './header.module.scss';
import { useRef, useState } from 'react';

export const Header = () => {
    const { isLogged, login } = useSelector(state => state.user);
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef(null);

    useClickOutside(ref, () => {
        if(openMenu) {
            setTimeout(() => {
                setOpenMenu(false);
            }, 300);
        }
    });    

    const handleMenu = (e) => {
        e.preventDefault();
        setOpenMenu(!openMenu);
    }

    return (
        <div className={style.header_wrapper}>
            <div className="container">
                <div className={style.header_inner}>

                    <Link className={style.logo} to='/'>
                        Warehouse <span>Manager</span>
                    </Link>

                    {isLogged && (
                        <>
                            <InfoBar />

                            <div className={style.button_box}>
                                <Button name={login} color='primary' clickHandler={handleMenu} />

                                {openMenu && <Dropdown ref={ref} />}
                            </div>
                        </>
                    )}

                </div>
            </div>

            <ErrorMessage />
        </div>
    )
}
