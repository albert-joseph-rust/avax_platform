import React from "react";
import styled from "styled-components";
import loveIcon from "../images/loveIcon.svg";
import HeaderIcon from "../images/HeaderIcon.PNG";
import Avatar from "@mui/material/Avatar";
import Profile from "../images/profile.jpg";

function Nft() {
  return (
    <Container>
      <div className="nft_image">
        <div className="love_circle">
          <img src={loveIcon} alt="" />
        </div>
      </div>
      <p className="nft_name">Botto, the decentralized AI/human artwork</p>
      <div className="price_track">
        <div className="price">
          <img src={HeaderIcon} alt="" />
          <p>1.95 QUID</p>
        </div>

        <button>Track</button>
      </div>

      <div className="user_info">
           <Avatar src ={Profile}/>
           <div className="user">
               <p className="by">Artwork by</p>
               <p className = "name">John Harsh</p>
           </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 265px;
  flex-direction: column;
  margin-right : 20px;
  margin-bottom : 40px;

  .nft_image {
    height: 290px;
    border-radius: 10px;
    background-image: url("https://media.npr.org/assets/img/2012/02/02/mona-lisa_custom-31a0453b88a2ebcb12c652bce5a1e9c35730a132.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .love_circle {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px;

    &:hover {
            cursor: pointer;
        }
  }

  .nft_name {
    margin-top: 10px;
    font-weight: 600;
    font-size: 18px;
    margin-bottom : 0px;
  }

  .price_track {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .price {
      display: flex;

      img {
        width: 38px;
        object-fit: contain;
      }

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 25px;
        color: #e0335d;
        margin-left : 10px;
      }
    }

    button{
        width : 62px;
        height : 31px;
        border-radius  : 5px;
        border : 1px solid lightgray;
        color: #788191;
        background-color: white;

        &:hover {
            cursor: pointer;
        }
    }
  }

  .user_info{
      display : flex;
      margin-top : 10px;
      
      .user{
         margin-left : 10px;
         font-size : 14px;
        .by{
            color: #788191;
        }

        .name{
           color : black;

        }
      }
  }
`;

export default Nft;
