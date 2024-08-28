import PropTypes from 'prop-types'
import classes from './alternate.module.css'
import MosaicItem from '../mosaicItem/MosaicItem'

AlternateRows.propTypes = {
    data: PropTypes.array
}

export default function AlternateRows ({ data }) {
  // Function to chunk items into alternating rows of 3 and 2
  const chunkItems = (data) => {
    const chunks = [];
    let i = 0;
    while (i < data.length) {
      const rowSize = chunks.length % 2 === 0 ? 3 : 2; // Alternate between 3 and 2
      chunks.push(data.slice(i, i + rowSize));
      i += rowSize;
    }
    return chunks;
  };

  const rows = chunkItems(data);

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.row}>
          {row.map((item) => (
            <MosaicItem key={item.name + rowIndex} item={item} />
          ))}
        </div>
      ))}
    </>
  );
}

