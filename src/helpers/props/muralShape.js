import PropTypes from 'prop-types';

const muralShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default muralShape;
