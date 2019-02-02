import muralRequests from './muralRequests';
import favoriteRequests from './favoriteRequests';

const getFavoritedMurals = currentUid => new Promise((resolve, reject) => {
  muralRequests.getMurals()
    .then((murals) => {
      favoriteRequests.getAllFavorites()
        .then((favorites) => {
          const muralsWithFavorite = murals.map((mural) => {
            const match = favorites.filter(favorite => favorite.muralId === mural.id && currentUid === favorite.uid);
            const muralWithFavorite = { ...mural };
            muralWithFavorite.isFavorite = match.length > 0;
            return muralWithFavorite;
          });
          resolve(muralsWithFavorite);
        });
    })
    .catch(err => reject(err));
});

export default {
  getFavoritedMurals,
};
