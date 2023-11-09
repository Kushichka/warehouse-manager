import { TopImageBox } from '../../components/TopImageBox/TopImageBox';
import wh_bg from '../../assets/wh_bg.jpg';

import style from './warehouse.module.scss'

export const Warehouse = () => {
    return (
        <section>
            <div className={style.warehouse}>
                <TopImageBox title='warehouse' image={wh_bg}/>

                <div className={style.content_wrapper}>

                </div>
            </div>
        </section>
    )
}
