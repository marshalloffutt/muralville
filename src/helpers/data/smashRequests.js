import muralRequests from './muralRequests';
import favoriteRequests from './favoriteRequests';

const getFavoritedMurals = currentUid => new Promise((resolve, reject) => {
  muralRequests.getMurals()
    .then((murals) => {
      favoriteRequests.getAllFavorites()
        .then((favorites) => {
          favorites.forEach((favorite) => {
            const match = murals.find(mural => mural.id === favorite.muralId);
            if (match.uid === currentUid) {
              match.isFavorite = true;
            }
          });
          resolve(murals);
        });
    })
    .catch(err => reject(err));
});

export default {
  getFavoritedMurals,
};
