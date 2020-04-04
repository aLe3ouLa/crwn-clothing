import { takeEvery, call, put , all} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionSnapshotsToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


export function* fetchCollectionsAsync() {
    yield 1;
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotsToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }

}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}

export function* shopSagas() {
    yield all([
      call(fetchCollectionsStart),
    ]);
  }
