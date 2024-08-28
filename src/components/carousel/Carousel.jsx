import PropTypes from 'prop-types'
import classes from './carousel.module.css';

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}

export default function Carousel({ images }) {

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.carousel}>
        {images.map((obj, index) => (
          <div key={`original-${index}`} className={classes.carouselImage}>
            <img src={obj.image.url} alt={obj.image.alt} />
          </div>
        ))}
        {images.map((obj, index) => (
          <div key={`clone-${index}`} className={classes.carouselImage}>
            <img src={obj.image.url} alt={obj.image.alt} />
          </div>
        ))}
        {images.map((obj, index) => (
          <div key={`clone2-${index}`} className={classes.carouselImage}>
            <img src={obj.image.url} alt={obj.image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}