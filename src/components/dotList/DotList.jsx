import PropTypes from 'prop-types'
import classes from './dotList.module.css'

DotList.propTypes = {
    list: PropTypes.object,
    imgList: PropTypes.object,
    showImages: PropTypes.bool
}

export default function DotList({ list, imgList, showImages }) {
    return (
        <div className={classes.space}>
            <div className={`headerContainer`}>
                <h3 className='heroHeader' style={{fontWeight: '500'}}>We Believe:</h3>
            </div>
            <div className={classes.listContainer}>
                {showImages ? (
                    <>
                        <div className={`${classes.listItem} ${classes.listSpacing}`}>
                            <h3>{list.justification1}</h3>
                            <img src={imgList.JustificationImage1.url} alt={imgList.JustificationImage1.alt} />
                        </div>
                        <div className={`${classes.listItem} ${classes.listSpacing}`}>
                            <h3>{list.justification2}</h3>
                            <img src={imgList.JustificationImage2.url} alt={imgList.JustificationImage2.alt} />
                        </div>
                        <div className={`${classes.listItem} ${classes.listSpacing}`}>
                            <h3>{list.justification3}</h3>
                            <img src={imgList.JustificationImage3.url} alt={imgList.JustificationImage3.alt} />
                        </div>
                        <div className={`${classes.listItem} ${classes.listSpacing}`}>
                            <h3>{list.justification4}</h3>
                            <img src={imgList.JustificationImage4.url} alt={imgList.JustificationImage4.alt} />
                        </div>
                    </>
                ) : (
                    <>
                        {
                            Object.entries(list).map(([key, value]) => {
                                if (key != "id") {
                                    return (
                                        <div key={key} className={classes.listItem}>
                                            <div className={classes.dot} />
                                            <h3>{value}</h3>
                                        </div>
                                    )
                                }
                            })
                        }
                    </>
                )}
            </div>
        </div >
    )
}