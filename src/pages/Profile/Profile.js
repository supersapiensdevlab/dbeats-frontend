import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { ShareModal } from '../../component/Modals/ShareModal/ShareModal';
import PageNotFound from '../../component/PageNotFound/PageNotFound';
import animationData from '../../lotties/error-animation.json';
import ChannelSection from './ProfileSections/ChannelSection';
import ChatRoom from './ProfileSections/ChatRoom/ChatRoom';
import ProfileDetails from './ProfileSections/ProfileDetails/ProfileDetails';
import NFTStore from './ProfileSections/Store/NFT_Store';
import Ticket from '../../Ticket';
import { getPublicUser } from '../../actions/userPublicActions';
const Profile = () => {
  // Redux
  const dispatch = useDispatch();
  const user_private = useSelector((state) => state.User);
  const user_public = useSelector((state) => state.UserPublic);
  // For Routing
  let match = useRouteMatch();
  let params = useParams();
  const tabname = params.tab;
  const urlUsername = params.username;

  const [privateUser, setPrivate] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [NFTData, setNFTData] = useState(null);

  const [sharable_data, setSharable_data] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const text = 'Copy To Clipboard';
  const [copybuttonText, setCopyButtonText] = useState(text);

  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  useEffect(() => {
    if (user_private.isAuthenticated) {
      if (user_private.user.username === urlUsername) {
        setSharable_data(
          `${process.env.REACT_APP_CLIENT_URL}/profile/${user_private.user.username}`,
        );
        setPrivate(true);
        get_NFT(user_private.user.wallet_id);
      } else {
        dispatch(getPublicUser(urlUsername));
        if (user_public.user) {
          get_NFT(user_public.user.wallet_id);
        }
        setPrivate(false);
      }
    } else {
      if (user_public.user) {
        get_NFT(user_public.user.wallet_id);
      }
      dispatch(getPublicUser(urlUsername));
      setPrivate(false);
    }
  }, [urlUsername]);

  // const get_User = async () => {
  //   await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${urlUsername}`).then((value) => {
  //     if (value.data === '') {
  //       setNotFound(true);
  //     } else {
  //       setUser(value.data);
  //       setSharable_data(`${process.env.REACT_APP_CLIENT_URL}/profile/${value.data.username}`);
  //       get_NFT(value.data);
  //     }
  //   });
  // };

  const get_NFT = async (wallet_id) => {
    let nftMedata = null;
    //-------------------------------------------------------Fetches all the NFT's of the user on Dbeats-------------------------------------------------------
    //address to use which has already minted the NFTs: 0x5d55407a341d96418ceda98e06c244a502fc9572 or else use ${value.wallet_id}
    await axios({
      method: 'GET',
      // url:
      //   'https://api.nftport.xyz/v0/accounts/' +
      //   value.wallet_id +
      //   '?chain=polygon&include=metadata',
      url: `https://api.covalenthq.com/v1/137/address/${wallet_id}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b5245f3db18d4a2d999fef65fc0`,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `${process.env.COVALENT_API_KEY}`,
      },
    })
      .then((response) => {
        console.log(response);
        let nftData = null;
        //when using covalent api tweak the response to get metadata
        for (let i = 0; i < response.data.data.items.length; i++) {
          const value = response.data.data.items[i];
          console.log(value.contract_address === '0x03160747b94be986261d9340d01128d4d5566383');
          if (value.contract_address === '0x03160747b94be986261d9340d01128d4d5566383') {
            console.log('thisruns');
            console.log(value.nft_data, value.contract_name);
            nftData = value.nft_data;
          }
        }
        console.log(nftData);
        //response.data.nfts for nftport;
        nftMedata = nftData;
      })
      .catch(function (error) {
        console.log(error);
      });
    //-------------------------------------------------------XXXXXXXXXXXXXXXXXENDXXXXXXXXXXXXXXXXXXXX---------------------------------------------------------
    setNFTData(nftMedata);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copybuttonText]);

  return (
    <>
      {(privateUser && user_private.user) || (!privateUser && user_public.user) ? (
        <div>
          {/* <Dashboard className="ml-20"></Dashboard> */}

          <div id="outer-container" className={`${darkMode && 'dark'}`}>
            <div
              id="page-wrap"
              className={` grid lg:pl-16 grid-cols-6  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary`}
            >
              <ChannelSection
                privateUser={privateUser}
                user={privateUser ? user_private.user : user_public.user}
                className="md:visible invisible"
              />
              <Switch>
                <Route path={`/profile/:username/text`}>
                  <ChatRoom
                    userp={privateUser ? user_private.user : user_public.user}
                    privateUser={privateUser}
                  ></ChatRoom>
                </Route>
                <Route path={`/profile/:username/store`}>
                  <NFTStore NFTData={NFTData} />
                </Route>

                <Route exact path={`/profile/:username/event`} component={Ticket}></Route>

                <Route path={`${match.path}`}>
                  <ProfileDetails
                    privateUser={privateUser}
                    setSharable_data={setSharable_data}
                    tabname={tabname}
                    urlUsername={urlUsername}
                    user={privateUser ? user_private.user : user_public.user}
                    setShow={setShow}
                    darkMode={darkMode}
                  />
                </Route>
              </Switch>
            </div>

            <ShareModal
              show={show}
              handleClose={handleClose}
              sharable_data={sharable_data}
              copybuttonText={copybuttonText}
              setCopyButtonText={setCopyButtonText}
            />
          </div>
        </div>
      ) : null}
      {user_public.error ? (
        <PageNotFound
          headtext="User Not found"
          text="Please check the Username"
          animation={animationData}
        />
      ) : null}
    </>
  );
};
export default Profile;
