import { memo } from 'react';

import { BiCoinStack } from 'react-icons/bi';
import { FaHelmetSafety } from 'react-icons/fa6';

import style from './infoBar.module.scss';

export const InfoBar = memo(() => {
    return (
        <div className={style.info}>
            <div className={style.info_item}>
                <BiCoinStack />

                <p>
                    200763 <span>zł</span>
                </p>
            </div>

            <div className={style.info_item}>
                <FaHelmetSafety />

                <p>
                    1 / 3
                </p>
            </div>
        </div>
    )
});
