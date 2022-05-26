import React from 'react';
import cx from 'classnames';

import Card from '../NFTCardOwner';
import {useWeb3React} from '@web3-react/core'
import styles from './styles.module.scss';
// import { Categories } from '../../constants/filter.constants';
import { useDispatch } from 'react-redux';
// import FilterActions from '../../actions/filter.actions';


const NFTsGridOwner = ({
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
  const {account} = useWeb3React()
  const n = numPerRow || 6;
  const className = cx(styles.nft, styles[`num${n}`]);
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
        {console.log("fhakjshkjhaiufhfiulaeahfiufiuwihweaiulfhw: ", items)}
      {(items || []).map(item => (
        <>
        {item.owner == account && (
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

export default NFTsGridOwner;
