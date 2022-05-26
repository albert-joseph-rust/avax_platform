import React, { useState , useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import BackIcon from "../images/back.svg";
import DownIcon from "../images/DownIcon.svg";
import UpIcon from "../images/UpIcon.svg";
import storeFront from "../images/storeFront.PNG";
import Drop from "../components/Drop";
import banner from "../images/banner.svg";
import Nft from "../components/Nft";
import { getAllOrders, getTokenData } from '../api/api';
import AfterLoginFooter from "../components/AfterLoginFooter";
import {useNavigate} from 'react-router-dom'
import ExploreAllPage from '../components/explore';

function StoreFrontPage({account}) {
  const [orderData, setOrderData] = useState([]);
  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cancelSource, setCancelSource] = useState(null)

  useEffect(() => {
    setLoading(true);
    getAllOrders().then(res => {
        setOrderData(res);
        const tokenIds = [];
        res.forEach(order => {
            tokenIds.push(order.tokenId);
        });
        getTokenData(tokenIds).then(result => {
            setTokenData(result);
            setLoading(false)
        });
    })
}, []);

  return (
    <Container>
      <div className="page">
      <div className="storeFrontPage">
        <div className="header">
          <div className="header_text">
            <p className="title">Claim ownership of your own NFT today!</p>
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>

            <div className="buttons">
              <button className="explore">Explore</button>
              <button className="create_your_own"
               onClick={() => navigate('/create')}
              >Create your own</button>
            </div>
          </div>
          <div className="header_image">
            <img src={storeFront} alt="" />
          </div>
        </div>

        <div className="middle">
          <div className="middle_header">
            <p>Latest Drops</p>
            <button>View all</button>
          </div>

          {/* <div className="middle_collection">
            {tokenData.map((item , index) => (
                <Drop data={item} price={orderData[index].price} account={account} orderId={orderData[index].id} />
            ))}
          </div> */}
          <div className="middle_collection">
            <ExploreAllPage />
          </div>
        </div>

        <div className="banner">
          <div className="banner_info">
            <div className="title">Claim ownership of your favorite album</div>
            <div className="info">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
            <button>Explore albums</button>
          </div>
          <div className="banner_image">
            <img src={banner} alt="" />
          </div>
        </div>

        <div className="bottom">
          <p className="title">Highest Ranked</p>
          <div className="bottom_header">
            <p className="all">All</p>
            <p className="option">Artworks</p>
            <p className="option">Music</p>
            <p className="option">Collectables</p>
            <p className="option">Photography</p>
          </div>

          <div className="nfts">
              <Nft/>
              <Nft/>
              <Nft/>
              <Nft/>
              <Nft/>
              <Nft/>
              <Nft/>
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
    max-height: 90vh !important;
    overflow-y : scroll;
  ::-webkit-scrollbar{
    display : none;
  }

  .storeFrontPage {
    flex: 1;
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;

    .header {
      display: flex;
      justify-content: space-between;

      .header_text {
        width: 500px;
        .title {
          font-weight: 700;
          font-size: 40px;
          margin-bottom: 20px;
        }

        .info {
          font-weight: 400;
          font-size: 16px;
          color: #858fa2;
        }

        .buttons {
          display: flex;
          margin-top: 20px;

          button {
            height: 50px;
            width: 202px;
            border-radius: 5px;
          }

          .explore {
            background: #e0335d;
            color: #ffffff;
            border: 0;
            margin-right: 20px;
          }

          .create_your_own {
            background: white;
            color: #e0335d;
            border: 1px solid #e0335d;
          }
        }
      }

      .header_image {
        img {
          width: 500px;
          object-fit: contain;
        }
      }
    }

    .middle {
      margin-top: 30px;

      .middle_header {
        display: flex;
        justify-content: space-between;

        button {
          height: 45px;
          width: 170px;
          border-radius: 5px;
          background: #e0335d;
          color: #ffffff;
          border: 0;
        }

        p {
          font-weight: 700;
          font-size: 25px;
        }
      }

      .middle_collection {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        width: 75vw;
      }
    }

    .banner {
      display: flex;
      height: 409px;
      width: 1112px;
      border-radius: 20px;
      background: #e0335d;
      margin-top: 20px;

      .banner_info {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          color: #fff;
          margin: 20px 0 20px 0px;
        }

        .info {
          margin-top: 10px;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 20px;
          color: #ffffff;
        }

        button {
          width: 230px;
          height: 50px;
          background-color: #fff;
          border: 0;
          border-radius: 5px;

          font-weight: 700;
          font-size: 16px;

          text-align: center;

          color: #de456a;
        }
      }
    }

    .bottom {
      margin-top: 30px;
      .title {
        font-weight: 700;
        font-size: 25px;
        margin-bottom: 20px;
      }

      .bottom_header {
        display: flex;
        .all{
          background-color: #e0335d;
          color: white;
          border-radius: 5px;
          padding: 5px 30px 5px 30px;
          margin-right: 30px;
        }

        .option{
         background-color: white;
          color: #858FA2;
          border-radius: 5px;
          padding: 5px 30px 5px 30px;
          margin-right: 30px;
          border : 2px solid lightgray;
        }
      }


      .nfts{
          margin-top : 20px;
          display :flex;
          width : fit-content;
          width : 85vw;
          flex-wrap : wrap;
          /* justify-content : space-around; */
          margin-bottom : 50px;
        }
    }
  }
`;

export default StoreFrontPage;
