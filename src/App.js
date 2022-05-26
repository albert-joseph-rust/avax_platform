import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate , useNavigate} from 'react-router-dom';
import Loading from './components/Loading';
import Header from './components/Header';
import { useWeb3React } from '@web3-react/core';
import { injected } from './components/Connectors';
import Swal from 'sweetalert2';
import DetailPage from './pages/DetailPage';
import MintPage from './pages/mint';
import CreateAlbum from './pages/CreateAlbum';
import SellPage from './pages/SellPage';
import { login } from './api/api';
import LoginPage from './pages/LoginPage';
import AfterLoginHeader from './components/AfterLoginHeader';
import StoreFrontPage from './pages/StoreFrontPage';
import ProfilePage2 from './pages/ProfilePage2';
import NFTItem from './pages/NFTItem'

function App() {
  const { active, account, library, activate } = useWeb3React();
  const [isLoaded, setLoaded] = useState(false);
  const [conn, setConn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (active)
      setConn(true);
    else
      setConn(false);
  }, [active]);

  useEffect(() => {
    if (conn) {
      login(account).then(res => {
        console.log(res);
      });
    }
  }, [conn]);

  const connectMetamask = async () => {
    console.log('Ran')
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xa869' }], // chainId must be in hexadecimal numbers
        });
        await activate(injected);
      } catch (error) {
        console.log("Error code is" , error.code);
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xa869',
                  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    } else {
      Swal.fire({
        title: 'Metamask',
        text: 'Please install metamask extension',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  if (!isLoaded)
    return (
      <Loading />
    );

  return (
    <div className='container-fluid p-0'>
      <Router>
        {conn?(<AfterLoginHeader account={account} isConnected = {conn}/>):(<Header isConnected={conn} account={account} onClick={connectMetamask} />)}
        <Routes>
          <Route path='/' exact element={<Navigate to='/marketplace' />} />
          <Route path='/login' exact element = {<LoginPage connect={connectMetamask} />} />
          <Route path='/marketplace' exact element={<StoreFrontPage account={account} />} />
          <Route path="/marketplace/:addr/:id/:_owner" exact element={<NFTItem />}/>
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/detail'>
            {account?(<Route path=':id' element={<DetailPage library={library} account={account} />} />):(<Route path='' element={<LoginPage/>}/>)}
          </Route>
          <Route path='/create' exact element={account?<MintPage library={library} account={account} />:<LoginPage/>} />
          <Route path='/create-album' exact element={account?<CreateAlbum />:<LoginPage/>} />
          <Route path='/profile'>
          <Route path=':address' element={account?<ProfilePage2/>:<LoginPage connect={connectMetamask}/>} />
          </Route>
          <Route path='/sell'>
            <Route path=':id' element={account?<SellPage library={library} account={account} />:<LoginPage connect={connectMetamask}/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
