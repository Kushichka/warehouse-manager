import { useEffect } from 'react';

import { useGetEmployeesQuery } from '../../api/userApi';
import { TopImageBox } from '../../components/TopImageBox/TopImageBox';
import wh_bg from '../../assets/wh_bg.jpg';

import style from './employees.module.scss';

export const Employees = () => {
const {data} = useGetEmployeesQuery();

useEffect(() => {
    console.log(data);
}, [data]);

    return (
        <section>
            <div className={style.employees}>
                <TopImageBox title='empoyees' image={wh_bg} />

                <div className={style.content}>
                    <p className={style.email}>
                        {data && data.email}
                    </p>
                </div>
            </div>
        </section>
    )
}
