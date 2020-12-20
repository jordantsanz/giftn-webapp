/* eslint-disable react/style-prop-object */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class MailTest extends Component {
  render() {
    return (
      <div className="email-outer"
        style="display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: space-around;"
      >
        <div className="top-section"
          style="    display: flex;
    background: #002863;
    width: 837px;
    height: 119px;
    justify-content: center;
    align-items: center;"
        >
          <div className="logo-white-email"
            style="font-family: SirinStencil;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 52px;
display: flex;
align-items: center;
text-align: center;
color: white;"
          >Giftn
          </div>
        </div>
        <div className="top-border">
          <div className="blue-div" />
          <div className="blue-div" />
        </div>
        <div className="green-div"
          style="    width: 837px;
    height: 643px;
    background: #023535;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;"
        >
          <div className="email-title"
            style="font-style: normal;
font-weight: normal;
font-size: 48px;
line-height: 65px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

/* rosy cheeks */

color: #FF77E1;"
          >You&apos;ve got a package coming!
          </div>
          <div className="pink-box"
            style="width: 398px;
height: 262px;
left: 101px;
top: 307px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

background: #FF77E1;"
          >
            <div className="to-box"
              style="width: 107px;
height: 28px;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
margin-bottom: 10px;
line-height: 12px;
justify-content: center;

display: inline-flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;

background: #F35849;"
            > To: to-name
            </div>
            <div className="from-box"
              style="    width: 97px;
height: 28px;
left: 150px;
top: 52px;
margin-bottom: 10px;

background: #81D7AD;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: inline-flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #0E0B0B;"
            > From: from-name
            </div>
            <div className="message-box"
              style="display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
width: 320px;
height: 124px;
left: 39px;
top: 104px;

background: #002863;"
            />
          </div>
          <div className="tracking-number-box"
            style="    width: 398px;
height: 48px;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
letter-spacing: 0.03em;

color: #000000;

background: #FFF5F5;"
          />
        </div>
        <div className="bottom-border">
          <div className="blue-div" />
          <div className="blue-div" />
        </div>
        <div className="yellow-box"
          style="    width: 837px;
    height: 329px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* five golden rings */

    background: #F5DA77;"
        >
          <div className="thanks-button"
            style="    width: 82px;
    height: 28px;

    background: #F35849;
    font-family: $josefin;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;
justify-content: center;
color: #FFF5F5;"
          >Say Thanks
          </div>
          <div className="sign-up-button"
            style="   display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 112px;
    height: 28px;
    margin-top: 20px;

    justify-content: center;
    font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;
    background: #002863;"
          >Sign up for giftn
          </div>
        </div>
        <div className="logo-black">giftn</div>
        <div className="border-bottom">
          <div className="yellow-div" />
          <div className="yellow-div" />
        </div>
      </div>
    );
  }
}

export default MailTest;
