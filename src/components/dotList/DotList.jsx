import PropTypes from 'prop-types'
import classes from './dotList.module.css'

DotList.propTypes = {
    list: PropTypes.object,
    imgList: PropTypes.object,
}

export default function DotList({ list, imgList }) {
    return (
        <div className={classes.listContainer}>
            <div className={classes.listItem}>
                <h3>{list.justification1}</h3>
                <img src={imgList.JustificationImage1.url} alt={imgList.JustificationImage1.alt} />
            </div>
            <div className={classes.listItem}>
                <h3>{list.justification2}</h3>
                <img src={imgList.JustificationImage2.url} alt={imgList.JustificationImage2.alt} />
            </div>
            <div className={classes.listItem}>
                <h3>{list.justification3}</h3>
                <img src={imgList.JustificationImage3.url} alt={imgList.JustificationImage3.alt} />
            </div>
            <div className={classes.listItem}>
                <h3>{list.justification4}</h3>
                <img src={imgList.JustificationImage4.url} alt={imgList.JustificationImage4.alt} />
            </div>
        </div>
    )
}