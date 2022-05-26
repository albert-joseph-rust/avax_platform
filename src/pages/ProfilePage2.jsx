
import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Profile from "../images/profile.jpg";
import LOGO from "../images/LOGO.svg";
import copyIcon from "../images/copyIcon.PNG";
import SearchIcon from "../images/Search.svg";
import DownArrowIcon from "../images/DownIcon.svg";
import FilterIcon from "../images/Filter.svg";
import Nft from "../components/Nft";
import { useParams } from "react-router-dom";
import AfterLoginFooter from "../components/AfterLoginFooter";

import ExploreFilterHeader from '../components/explore/Body/FilterHeader'
import { useApi } from '../api'
import CollectionsActions from '../actions/collections.actions'
import TokensActions from '../actions/tokens.actions'
import useWindowDimensions from '../hooks/useWindowDimensions'
import usePrevious from '../hooks/usePrevious'
import axios from 'axios'
import {useWeb3React} from '@web3-react/core'
import {useResizeDetector} from 'react-resize-detector'
import styles from '../components/explore/styles.module.scss'
import NFTsGridOwner from '../components/NFTsGridOwner';




function ProfilePage2() {

  const { fetchCollections, fetchTokens, getItemsLiked } = useApi()

  const dispatch = useDispatch()

  const { chainId } = useWeb3React()

  const { width: gridWidth, ref } = useResizeDetector()
  const { width } = useWindowDimensions()

  const conRef = useRef()
  const [fetchInterval, setFetchInterval] = useState(null)
  const [cancelSource, setCancelSource] = useState(null)
  const [likeCancelSource, setLikeCancelSource] = useState(null)
  const [prevNumPerRow, setPrevNumPerRow] = useState(null)

  const { authToken } = useSelector(state => state.ConnectWallet)
  const { upFetching, downFetching, tokens, count, from, to } = useSelector(state => state.Tokens)
  const {
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter)

  const prevAuthToken = usePrevious(authToken)

  const numPerRow = Math.floor(gridWidth / 240)
  const fetchCount = numPerRow <= 3 ? 18 : numPerRow === 4 ? 16 : numPerRow * 3

  useEffect(() => {

    if (fetchInterval) {
      clearInterval(fetchInterval)
    }

    updateCollections()
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10))
  }, [])

  const updateCollections = async () => {
    try {
      dispatch(CollectionsActions.fetchStart())
      const res = await fetchCollections()
      if (res.status === 'success') {
        const verified = []
        const unverified = []
        res.data.map(item => {
          if (item.isVerified) verified.push(item)
          else unverified.push(item)
        })
        dispatch(CollectionsActions.fetchSuccess([...verified, ...unverified]))
      }
    } catch {
      dispatch(CollectionsActions.fetchFailed())
    }
  }

  const fetchNFTs = async dir => {
    if (cancelSource) {
      cancelSource.cancel()
    }
    if (isNaN(fetchCount)) return

    try {
      const filterBy = []
      if (statusBuyNow) filterBy.push('buyNow')
      if (statusHasBids) filterBy.push('hasBids')
      if (statusHasOffers) filterBy.push('hasOffers')
      if (statusOnAuction) filterBy.push('onAuction')

      const cancelTokenSource = axios.CancelToken.source()
      setCancelSource(cancelTokenSource)

      let start
      let _count = fetchCount
      if (dir !== 0) {
        _count -= tokens.length % numPerRow
        start = Math.max(dir < 0 ? from - _count : to, 0)
      } else {
        start = from
        _count = fetchCount * 2
      }
      if (start === count) {
        return
      }

      dispatch(TokensActions.startFetching(dir))
      console.log('arguments are ', 'start : ', start, '_count : ', _count, 'groupType : ', groupType, 'collections : ', collections, 'category : ', category, 'sortBy : ', sortBy, 'filterBy : ', filterBy, 'cancelTokenSource : ', cancelTokenSource)
      let data = await fetchTokens(
        start,
        _count,
        groupType,
        collections,
        category,
        sortBy,
        filterBy,
        null,
      )

      if (data) {
        console.log('data is ', data)
        let newTokensbefore =
          dir > 0
            ? [...tokens, ...data]
            : dir < 0
              ? [...data, ...tokens]
              : data
        console.log('NFT Items are ', newTokensbefore.data.tokens)
        let newTokens = newTokensbefore.data.tokens;

        let _from = from
        let _to = to
        const newCount = newTokens.length - tokens.length
        if (dir > 0) {
          _to += newCount
        } else if (dir < 0) {
          _from -= newCount
        } else {
          _to = _from + newTokens.length
        }
        newTokens =
          dir > 0
            ? newTokens.slice(-fetchCount * 2)
            : newTokens.slice(0, fetchCount * 2)
        if (dir > 0) {
          _from = _to - newTokens.length
        } else if (dir < 0) {
          _to = _from + newTokens.length
        }
        dispatch(
          TokensActions.fetchingSuccess(data.total, newTokens, _from, _to)
        )
        if (dir === 0 && from) {
          const obj = width > 600 ? ref.current : conRef.current
          obj.scrollTop = (obj.scrollHeight - obj.clientHeight) / 2
        }
      }
    } catch (e) {
      console.log('the reason is ', e);
      if (!axios.isCancel(e)) {
        dispatch(TokensActions.fetchingFailed())
      }
    } finally {
      setCancelSource(null)
    }
  }

  useEffect(() => {
    setPrevNumPerRow(numPerRow)
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return
    fetchNFTs(0)
  }, [
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
    chainId,
    numPerRow,
  ])

  const updateItems = async () => {
    try {
      if (!authToken) {
        if (prevAuthToken) {
          dispatch(
            TokensActions.updateTokens(
              tokens.map(tk => ({
                ...tk,
                isLiked: false,
              }))
            )
          )
        }
        return
      }
      let missingTokens = tokens.map((tk, index) =>
        tk.items
          ? {
            index,
            isLiked: tk.isLiked,
            bundleID: tk._id,
          }
          : {
            index,
            isLiked: tk.isLiked,
            contractAddress: tk.contractAddress,
            tokenID: tk.tokenID,
          }
      )
      if (prevAuthToken) {
        missingTokens = missingTokens.filter(tk => tk.isLiked === undefined)
      }

      if (missingTokens.length === 0) return

      const cancelTokenSource = axios.CancelToken.source()
      setLikeCancelSource(cancelTokenSource)
      const { data, status } = await getItemsLiked(
        missingTokens,
        authToken,
        cancelTokenSource.token
      )
      if (status === 'success') {
        const newTokens = [...tokens]
        missingTokens.map((tk, idx) => {
          newTokens[tk.index].isLiked = data[idx].isLiked
        })
        dispatch(TokensActions.updateTokens(newTokens))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLikeCancelSource(null)
    }
  }
  useEffect(() => {

    if (likeCancelSource) {
      likeCancelSource.cancel()
    }
    if (tokens.length) {
      updateItems()
    }
  }, [tokens, authToken])

  const {address} = useParams();
  const[name , setName] = useState();
  const[profileUrl,setProfileUrl] = useState(undefined);

  useEffect(() => {
    if(address === '0xce31E9F5503FaBdCBd99137944F6f71933831cb9'){
        setName('Thomas Lang');
        setProfileUrl('https://dr56wvhu2c8zo.cloudfront.net/drumuniverse/assets/33600dfd-caa5-45b5-9726-44205e9a42d2/Francesco_002.jpg')
    }else if(address === '0xF1FDC4eb37a8395858F20AC26F4114330DD62491'){
        setName('Mel Bay');
        setProfileUrl('http://www.spotlightagency.co.za/photos/2019/20190912/176341_imageorig_513615c4.jpg')
    }else{
        setName('Craig Austin')
    }
  } ,[])


  return (
    <Container>
      <div className="page">
      <div className="profilePage">
        <div className="top">
          <div className="cover_photo"></div>
          <div className="top_info">
            <div className="follow_button">
              {profileUrl?(<Avatar src={profileUrl} className="avatar" />):(<Avatar src={Profile} className="avatar" />)}
              <button className="follow">Follow</button>
            </div>

            <p className="name">{name}</p>

            <div className="address">
              <img src={LOGO} alt="" className="logo" />
              <p>{address.slice(0,15)}...</p>
              <img className="copy_icon" src={copyIcon} alt="" />
            </div>

            <p className="other_info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis...
            </p>

            <p className="joined_on">Joined December 2021</p>
          </div>
        </div>
        <div className="bottom">
          <div className="header">
            <div className="header_options">
              <div className="collected"
              >
                <p>Collected</p>
                <span>10</span>
              </div>
              <div className="option">
                <p>Created</p>
                <span>10</span>
              </div>
              <div className="option">
                <p>Favourited</p>
                <span>10</span>
              </div>
              <div className="option">
                <p>Activity</p>
                <span>10</span>
              </div>
            </div>
            <p className="offers">Offers</p>
          </div>

          <div className="bottom_content">
            <div className="bottom_header_2">
              <div className="left">
                <div className="search_bar">
                  <img src={SearchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Red hot chilli peppers"
                  />
                </div>

                <div className="inner_div">
                  <p>All items</p>
                  <img src={DownArrowIcon} alt="" />
                </div>

                <div className="inner_div">
                  <p>Recently Listed</p>
                  <img src={DownArrowIcon} alt="" />
                </div>
              </div>

              <div className="right">
                <div className="inner_div">
                  <p>Filter</p>
                  <img src={FilterIcon} alt="" />
                </div>
              </div>
            </div>

            <div className="nfts">
              <div className={styles.body}>
                <div className={styles.filterHeader}>
                  <ExploreFilterHeader
                    loading={upFetching || downFetching}
                    category={category}
                  />
                </div>
                <div
                  ref={ref}
                  className={styles.exploreAll}
                >
                  <NFTsGridOwner
                    items={tokens}
                    uploading={upFetching}
                    loading={downFetching}
                    numPerRow={numPerRow}
                    category={category}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AfterLoginFooter/>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width : 100vw;
  overflow-x: hidden;
  
  .page{
    /* height : fit-content; */
    max-height: 90vh !important;
    overflow-y : scroll;
  ::-webkit-scrollbar{
    display : none;
  }
  }

  .profilePage {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      .cover_photo {
        height: 160px;
        background-image: url("https://media.istockphoto.com/photos/space-background-wiht-stars-stock-image-picture-id1287901429?b=1&k=20&m=1287901429&s=170667a&w=0&h=RH6-KPEq-WYftCxoKnQixr8SOwyHlWr8F8EfloDmTxg=");
        background-size: cover;
        width: 100vw;
        background-position: center;
        background-repeat : no-repeat;
      }

      .top_info {
        margin-left: 170px;

        .follow_button {
          display: flex;
          justify-content: space-between;
          width: 70vw;

          .avatar {
            height: 200px;
            width: 200px;
            margin-top: -100px;
            border: 10px solid white;
          }

          button {
            height: 50px !important;
            margin-top: 20px;
            background-color: white;
            border: 2px solid gray;
            border-radius: 5px;
            width: 180px;
            color: gray;
            font-weight: 500;

            &:hover {
              cursor: pointer;
            }
          }
        }

        .name {
          font-weight: 700;
          font-size: 30px;
          margin-top: 10px;
        }

        .address {
          border: 2px solid lightgray;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          width: 270px;
          margin-top: 20px;

          p {
            flex: 1;
            margin-top: auto;
            margin-bottom: auto;
            text-align: center;
            color: #858fa2;
            font-size: 18px;
          }
          .copy_icon {
            width: 28px;
          }

          .logo {
            width: 20px;
            margin-right: 8px;
          }
        }

        .other_info {
          width: 660px;
          color: #858fa2;
          margin-top: 20px;
        }

        .joined_on {
          font-weight: 700;
          font-size: 14px;
          color: #858fa2;
          margin-top: 20px;
        }
      }
    }

    .bottom {
      margin-top: 30px;
      .header {
        margin-left: 170px;
        display: flex;
        justify-content: space-between;
        width: 80vw;
        border-bottom: 1px solid lightgray;

        .collected{
          color: #e0335d !important;
          border-bottom: 2px solid #e0335d !important;
          display: flex;
          margin-right: 40px;
          padding-bottom: 20px;

          p {
            font-weight: 500;
            font-size: 18px;
          }

          span {
            margin-left: 5px;
            font-size: 15px;
            margin-top: 3px;
            margin-bottom: auto;
          }
        }

        .header_options {
          display: flex;

          .option {
            display: flex;
            margin-right: 40px;
            padding-bottom: 20px;
            p {
              font-weight: 500;
              font-size: 18px;
              color: #4a5568;
            }

            span {
              margin-left: 5px;
              color: #4a5568;
              font-size: 15px;
              margin-top: 3px;
              margin-bottom: auto;
            }
          }
        }

        .offers {
          font-weight: 500;
          font-size: 18px;
          color: #4a5568;
        }
      }

      .bottom_content {
        background-color: #fffbfb;
        padding-top: 30px;

        .bottom_header_2 {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          border: 1px solid gray;
          border-radius: 10px;
          background-color: white;
          width : 1100px;
          margin-left : 170px;

          .left {
            display: flex;


            .inner_div {
              border: 1px solid lightgray;
              border-radius: 5px;
              padding: 10px;
              display: flex;
              width: 180px;
              justify-content: space-between;
              margin-right: 15px;

              p {
                font-size: 14px;
              }

              img {
                width: 15px;
              }
            }

            .search_bar {
              display: flex;
              width: 450px;
              border: 1px solid lightgray;
              border-radius: 5px;
              padding: 10px;
              margin-right: 15px;
              background: #f3f3f4;

              input {
                outline-width: 0;
                border: 0;
                width: 95%;
                background: #f3f3f4;
              }

              img {
                width: 16px;
                object-fit: contain;
                margin-right: 5px;
              }
            }
          }

          .right{
            .inner_div {
              border: 1px solid lightgray;
              border-radius: 5px;
              padding: 10px;
              display: flex;
              width: 88px;
              justify-content: space-between;

              p {
                font-size: 14px;
              }

              img {
                width: 15px;
              }
            }
          }
        }

        .nfts{
          margin-left : 170px;
          margin-top : 20px;
          display :flex;
          width : 1200px;
          flex-wrap : wrap;
          /* justify-content : space-around; */
          margin-bottom : 50px;
        }
      }
    }
  }
`;

export default ProfilePage2;
