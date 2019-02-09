import React from 'react';
import PropTypes from 'prop-types';
import muralShape from '../../helpers/props/muralShape';
import authRequests from '../../helpers/data/authRequests';
import favoriteRequests from '../../helpers/data/favoriteRequests';
import './MuralCard.scss';
import tempMural from '../../images/temp_mural.png';

class MuralCard extends React.Component {
  static propTypes = {
    mural: muralShape,
    initializeSingleCardView: PropTypes.func,
  }

  clickedCard = (e) => {
    e.preventDefault();
    const muralId = e.target.closest('.mural-item').id;
    const selectedMural = this.props.murals.find(mural => mural.id === muralId);
    const { initializeSingleCardView } = this.props;
    initializeSingleCardView(muralId, selectedMural);
  }

  favoriteEvent = (e) => {
    e.preventDefault();
    const uid = authRequests.getCurrentUid();
    const muralId = e.target.id;
    const newFavorite = {};
    newFavorite.muralId = muralId;
    newFavorite.uid = uid;
    const { addFavorite } = this.props;
    addFavorite(newFavorite);
  }

  unFavoriteEvent = e => new Promise((resolve, reject) => {
    e.preventDefault();
    const uid = authRequests.getCurrentUid();
    const muralId = e.target.id;
    const { unFavorite } = this.props;
    favoriteRequests.getAllFavorites()
      .then((favorites) => {
        const faveToDelete = favorites.find(favorite => favorite.muralId === muralId && favorite.uid === uid);
        resolve(faveToDelete);
        unFavorite(faveToDelete.id);
      })
      .catch(err => reject(err));
  })

  render() {
    const { mural } = this.props;

    const writePhotos = () => {
      if (mural.image === '') {
        return <img className="card-img-top" src={tempMural} alt={mural.title}/>;
      } return <img className="card-img-top" src={mural.image} alt={mural.title} />;
    };

    const makeStars = () => {
      if (mural.isFavorite === true) {
        return <i id={mural.id} className="fas fa-star fa-2x card-img-button-favorite" onClick={this.unFavoriteEvent}></i>;
      } return <i id={mural.id} className="fas fa-star fa-2x card-img-button" onClick={this.favoriteEvent}></i>;
    };

    return (
      <div className="parent-div p-0 m-0">
        {makeStars()}
        <div className="m-4 mural-item" id={mural.id} onClick={this.clickedCard}>
          <div className="card mural-card">
            <div className="pt-3 pl-3 pr-3">
                {writePhotos()}
                <h3 className="card-title mural-card-title mt-1">{mural.title}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MuralCard;
