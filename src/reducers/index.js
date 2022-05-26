import { combineReducers } from 'redux';

import { Auth } from './auth.reducers';
import { ConnectWallet } from './connectwallet.reducers';
import { Tokens } from './tokens.reducers';
import { Collections } from './collections.reducers';
import { Filter } from './filter.reducers';
import { Modal } from './modal.reducers';

const rootReducer = combineReducers({
  Auth,
  ConnectWallet,
  Tokens,
  Collections,
  Filter,
  Modal,
});

export default rootReducer;
