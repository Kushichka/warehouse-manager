import { useEffect } from 'react';

import { useGetEmployeesQuery } from '../../api/userApi';

import style from './employees.module.scss';

export const Employees = () => {
const {data} = useGetEmployeesQuery();

useEffect(() => {
    console.log(data);
}, [data]);

    return (
        <section>
            <div className={style.employees}>
                <h2 className={style.page_title}>{data && data.email}</h2>
            </div>
        </section>
    )
}
