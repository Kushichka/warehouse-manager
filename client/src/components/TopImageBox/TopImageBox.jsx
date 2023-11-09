
// import wh_bg from '../../assets/wh_bg.jpg';

import style from './topImageBox.module.scss';

export const TopImageBox = ({title, image}) => {
    return (
        <div className={style.image_box}>
            <img src={image} alt={title} />

            <h2 className={style.title}>
                {title.charAt(0).toUpperCase().concat(title.slice(1))} {/* big first char */}
            </h2>
        </div>
    )
}
