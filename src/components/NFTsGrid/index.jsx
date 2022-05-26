import React, { useState, useEffect, Suspense } from 'react';
import cx from 'classnames';

import Card from '../NFTCard';
import {useWeb3React} from '@web3-react/core'
import styles from './styles.module.scss';
import Checkbox from '@mui/material/Checkbox';
import { useApi } from '../../api';
import axios from 'axios';

import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  CheckBox,
} from '@material-ui/icons';
// import { Categories } from '../../constants/filter.constants';
import { useDispatch } from 'react-redux';
// import FilterActions from '../../actions/filter.actions';

const NFTsGrid = ({
  items,
  numPerRow,
  uploading,
  loading,
  showCreate,
  // category,
  onCreate = () => {},
  onLike = () => {},
}) => {
  const dispatch = useDispatch();
  const n = numPerRow || 6;
  const className = cx(styles.nft, styles[`num${n}`]);
  const {account} = useWeb3React()

  return (
    <>
      {showCreate && (
        <div className={className}>
          <Card create onCreate={onCreate} />
        </div>
      )}
      {uploading &&
        new Array(n * 2).fill(0).map((_, idx) => (
          <div className={className} key={idx}>
            <Card loading />
          </div>
        ))}
        {console.log("Minted TOkens Datas: ", items)}
      {(items || []).map(item => (
        <> 
        { account === "0xce31E9F5503FaBdCBd99137944F6f71933831cb9" && (
          <div
            className={className}
            key={
              item.items ? item._id : `${item.contractAddress}-${item.tokenID}`
            }
          >
            <Card item={item} onLike={onLike} />
          </div>
        )}
        { (account !== "0xce31E9F5503FaBdCBd99137944F6f71933831cb9" && (!item.checked || item.checked === false)) && (
          <div
          className={className}
          key={
            item.items ? item._id : `${item.contractAddress}-${item.tokenID}`
          }
        >
          <Card item={item} onLike={onLike} />
        </div>
        )}
        </>
      ))}
      {loading &&
        new Array(n * 2).fill(0).map((_, idx) => (
          <div className={className} key={idx}>
            <Card loading />
          </div>
        ))}
    </>
  );
};

export default NFTsGrid;
