import PropTypes from 'prop-types'
import classes from './dotList.module.css'

DotList.propTypes = {
    list: PropTypes.object,
}

export default function DotList({ list }) {
    return (
        <div className={classes.listContainer}>
            {Object.entries(list).map(([key, value]) => {
                if (key != "id") {
                    return (
                        <div key={key} className={classes.listItem}>
                            <div className={classes.dot} />
                            <h3>{value}</h3>
                        </div>
                    )
                }
            })}
        </div>
    )
}