import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import TabItem from './components/TabItem'
import DataCard from './components/DataCard'

import './App.css';

const tabList = [
  {id:'ABOUT ME',displayText:'About Me'},
  {id:'EXPERIENCE',displayText:'Experience'},
  {id:'RECOMMENDED',displayText:'Recommended'}
]

const tabData = [
  {id:'ABOUT ME',text:"Hello! I am Dave, your sales rep here from Salesforce. I have been working at this awesome company for 3 years now.I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a..."},
  {id:'EXPERIENCE',text:
    "During my time as a Marketing Manager at Salesforce Corporation, I led a team of five in developing and executing digital marketing strategies, which resulted in a 20% increase in online sales within six months. I also spearheaded a social media campaign that grew the companys social media following by 50%, enhancing brand visibility."},
  {id:'RECOMMENDED',text:"I highly recommend Dave based on the outstanding contributions they made during their time as a Marketing Manager at XYZ Corporation. Leading a team of five, they successfully developed and executed digital marketing strategies that resulted in a 20% increase in online sales within just six months."}
]

const initialFormData = [
  {id:uuidv4(),imageUrl:'https://www.georgeanimatrix.com/blog/wp-content/uploads/2023/08/jpeg-optimizer_14-1.jpg'},
  {id:uuidv4(),imageUrl:'https://blog.cgify.com/wp-content/uploads/2020/01/purpose-of-design-1260x1055.jpg'},
  {id:uuidv4(),imageUrl:'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*x0d41ns8PTQZz4a3VbMrBg.png'},
  {id:uuidv4(),imageUrl:'https://i.ytimg.com/vi/ekHpCUwXX_M/maxresdefault.jpg'},
  {id:uuidv4(),imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdDy1MPyAklifM98twCxSuRj7EVJPO0cmHg&s'},
  {id:uuidv4(),imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'},
]

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none"}}
      onClick={onClick}
    />
  );
}

class App extends Component {
  state = {activeTabId:tabList[0].id,formData:initialFormData,setImage:'',sliderRef:React.createRef()}

  onSelectTabItem = id => {
    this.setState({activeTabId:id})
  }
  getFilteredProjects = () => {
    const {activeTabId} = this.state

    const filteredData = tabData.filter(
      eachItem => eachItem.id === activeTabId,
    )

    return filteredData
  }

  onHandleImage = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const newElement = {
        id: uuidv4(),
        imageUrl:reader.result
      }
      this.setState(prevState => ({formData: [...prevState.formData,newElement]}))
    }
    reader.readAsDataURL(file)
  }

  navigateNext = () => {
    const {sliderRef} = this.state
    sliderRef.current.slickNext();
  }
  
  navigatePrev = () => {
    const {sliderRef} = this.state
    sliderRef.current.slickPrev();
  }

  render() {
    const {activeTabId,formData,sliderRef} = this.state
    const filteredData = this.getFilteredProjects()
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }

    return (
      <div className="bg">
        <div className='left'>
        </div>
        <div className='right'>
          <div className='top-widget'>
            <div className='top'>
            <div className='top-left'>
              <img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.3846%2018C13.3846%2018.2738%2013.3034%2018.5415%2013.1513%2018.7692C12.9991%2018.9969%2012.7829%2019.1744%2012.5299%2019.2792C12.2769%2019.384%2011.9985%2019.4114%2011.7299%2019.358C11.4613%2019.3046%2011.2146%2019.1727%2011.0209%2018.9791C10.8273%2018.7854%2010.6954%2018.5387%2010.642%2018.2701C10.5886%2018.0015%2010.616%2017.7231%2010.7208%2017.4701C10.8256%2017.2171%2011.0031%2017.0009%2011.2308%2016.8487C11.4585%2016.6966%2011.7262%2016.6154%2012%2016.6154C12.3672%2016.6154%2012.7194%2016.7613%2012.9791%2017.0209C13.2387%2017.2806%2013.3846%2017.6328%2013.3846%2018ZM12%205.53846C9.45462%205.53846%207.38462%207.40192%207.38462%209.69231V10.1538C7.38462%2010.3987%207.48187%2010.6334%207.65498%2010.8066C7.82809%2010.9797%208.06288%2011.0769%208.3077%2011.0769C8.55251%2011.0769%208.7873%2010.9797%208.96041%2010.8066C9.13352%2010.6334%209.23077%2010.3987%209.23077%2010.1538V9.69231C9.23077%208.42308%2010.4735%207.38461%2012%207.38461C13.5265%207.38461%2014.7692%208.42308%2014.7692%209.69231C14.7692%2010.9615%2013.5265%2012%2012%2012C11.7552%2012%2011.5204%2012.0972%2011.3473%2012.2704C11.1742%2012.4435%2011.0769%2012.6783%2011.0769%2012.9231V13.8462C11.0769%2014.091%2011.1742%2014.3258%2011.3473%2014.4989C11.5204%2014.672%2011.7552%2014.7692%2012%2014.7692C12.2448%2014.7692%2012.4796%2014.672%2012.6527%2014.4989C12.8258%2014.3258%2012.9231%2014.091%2012.9231%2013.8462V13.7631C15.0277%2013.3765%2016.6154%2011.6977%2016.6154%209.69231C16.6154%207.40192%2014.5454%205.53846%2012%205.53846ZM24%2012C24%2014.3734%2023.2962%2016.6934%2021.9776%2018.6668C20.6591%2020.6402%2018.7849%2022.1783%2016.5922%2023.0865C14.3995%2023.9948%2011.9867%2024.2324%209.65892%2023.7694C7.33115%2023.3064%205.19295%2022.1635%203.51472%2020.4853C1.83649%2018.807%200.693605%2016.6689%200.230582%2014.3411C-0.232441%2012.0133%200.00519941%209.60051%200.913451%207.4078C1.8217%205.21508%203.35977%203.34094%205.33316%202.02236C7.30655%200.703788%209.62663%200%2012%200C15.1816%200.00335979%2018.2319%201.26872%2020.4816%203.51843C22.7313%205.76814%2023.9966%208.81843%2024%2012ZM22.1538%2012C22.1538%209.99176%2021.5583%208.02861%2020.4426%206.35882C19.3269%204.68903%2017.7411%203.38759%2015.8857%202.61907C14.0303%201.85055%2011.9887%201.64947%2010.0191%202.04126C8.04943%202.43305%206.24019%203.40011%204.82015%204.82015C3.40011%206.24019%202.43305%208.04943%202.04126%2010.0191C1.64947%2011.9887%201.85055%2014.0303%202.61907%2015.8857C3.38759%2017.7411%204.68904%2019.3269%206.35883%2020.4426C8.02862%2021.5583%209.99176%2022.1538%2012%2022.1538C14.692%2022.1508%2017.2729%2021.08%2019.1765%2019.1765C21.08%2017.2729%2022.1508%2014.692%2022.1538%2012Z'%20fill='url(%23paint0_linear_2267_3329)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2267_3329'%20x1='19.5'%20y1='27.5'%20x2='3.5'%20y2='2'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%234A4E54'/%3e%3cstop%20offset='1'%20stop-color='%23A3ADBA'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                alt="question logo" className='question-logo' />
            </div>
            <ul className='top-list-con'>
            {tabList.map(eachItem => (
              <TabItem key={eachItem.id} details={eachItem} onSelectTabItem={this.onSelectTabItem} isActive={activeTabId === eachItem.id} />
            ))}
            </ul>
            </div>
            <div className='bottom'>
              <div className='bottom-left'>
                <img src="data:image/svg+xml,%3csvg%20width='68'%20height='96'%20viewBox='0%200%2024%2031'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20y='10.6879'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20y='10.6879'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20y='21.3756'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20y='21.3756'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3c/svg%3e"
                  alt="question logo" className='widget-logo' />
              </div>
              <div className='bottom-con'>
                <DataCard key={filteredData[0].id} text={filteredData[0].text} />
              </div>
              <div className='ver-line'>
              </div>
            </div>
          </div>
          <div className='line'></div>
          <div className='bottom-widget'>
          <div className='bottom-top'>
            <div className='bottom-top-left'>
              <img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.3846%2018C13.3846%2018.2738%2013.3034%2018.5415%2013.1513%2018.7692C12.9991%2018.9969%2012.7829%2019.1744%2012.5299%2019.2792C12.2769%2019.384%2011.9985%2019.4114%2011.7299%2019.358C11.4613%2019.3046%2011.2146%2019.1727%2011.0209%2018.9791C10.8273%2018.7854%2010.6954%2018.5387%2010.642%2018.2701C10.5886%2018.0015%2010.616%2017.7231%2010.7208%2017.4701C10.8256%2017.2171%2011.0031%2017.0009%2011.2308%2016.8487C11.4585%2016.6966%2011.7262%2016.6154%2012%2016.6154C12.3672%2016.6154%2012.7194%2016.7613%2012.9791%2017.0209C13.2387%2017.2806%2013.3846%2017.6328%2013.3846%2018ZM12%205.53846C9.45462%205.53846%207.38462%207.40192%207.38462%209.69231V10.1538C7.38462%2010.3987%207.48187%2010.6334%207.65498%2010.8066C7.82809%2010.9797%208.06288%2011.0769%208.3077%2011.0769C8.55251%2011.0769%208.7873%2010.9797%208.96041%2010.8066C9.13352%2010.6334%209.23077%2010.3987%209.23077%2010.1538V9.69231C9.23077%208.42308%2010.4735%207.38461%2012%207.38461C13.5265%207.38461%2014.7692%208.42308%2014.7692%209.69231C14.7692%2010.9615%2013.5265%2012%2012%2012C11.7552%2012%2011.5204%2012.0972%2011.3473%2012.2704C11.1742%2012.4435%2011.0769%2012.6783%2011.0769%2012.9231V13.8462C11.0769%2014.091%2011.1742%2014.3258%2011.3473%2014.4989C11.5204%2014.672%2011.7552%2014.7692%2012%2014.7692C12.2448%2014.7692%2012.4796%2014.672%2012.6527%2014.4989C12.8258%2014.3258%2012.9231%2014.091%2012.9231%2013.8462V13.7631C15.0277%2013.3765%2016.6154%2011.6977%2016.6154%209.69231C16.6154%207.40192%2014.5454%205.53846%2012%205.53846ZM24%2012C24%2014.3734%2023.2962%2016.6934%2021.9776%2018.6668C20.6591%2020.6402%2018.7849%2022.1783%2016.5922%2023.0865C14.3995%2023.9948%2011.9867%2024.2324%209.65892%2023.7694C7.33115%2023.3064%205.19295%2022.1635%203.51472%2020.4853C1.83649%2018.807%200.693605%2016.6689%200.230582%2014.3411C-0.232441%2012.0133%200.00519941%209.60051%200.913451%207.4078C1.8217%205.21508%203.35977%203.34094%205.33316%202.02236C7.30655%200.703788%209.62663%200%2012%200C15.1816%200.00335979%2018.2319%201.26872%2020.4816%203.51843C22.7313%205.76814%2023.9966%208.81843%2024%2012ZM22.1538%2012C22.1538%209.99176%2021.5583%208.02861%2020.4426%206.35882C19.3269%204.68903%2017.7411%203.38759%2015.8857%202.61907C14.0303%201.85055%2011.9887%201.64947%2010.0191%202.04126C8.04943%202.43305%206.24019%203.40011%204.82015%204.82015C3.40011%206.24019%202.43305%208.04943%202.04126%2010.0191C1.64947%2011.9887%201.85055%2014.0303%202.61907%2015.8857C3.38759%2017.7411%204.68904%2019.3269%206.35883%2020.4426C8.02862%2021.5583%209.99176%2022.1538%2012%2022.1538C14.692%2022.1508%2017.2729%2021.08%2019.1765%2019.1765C21.08%2017.2729%2022.1508%2014.692%2022.1538%2012Z'%20fill='url(%23paint0_linear_2267_3329)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2267_3329'%20x1='19.5'%20y1='27.5'%20x2='3.5'%20y2='2'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%234A4E54'/%3e%3cstop%20offset='1'%20stop-color='%23A3ADBA'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                alt="question logo" className='question-logo' />
            </div>
            <div className='top-right'>
              <div className='top-head-con'>
                <h1 className='top-head'>Gallery</h1>
              </div>
              <div className='top-right-right'>
                <label htmlFor="file-upload" className="custom-file-upload">
                  + ADD IMAGE
                </label>
                <input id="file-upload" type="file" onChange={this.onHandleImage}/>
                <button type="button" className='arrow-btn' onClick={this.navigatePrev}>
                <svg stroke="currentColor" fill="currentColor" color='#6F787C'  viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
                </button>
                <button type="button" className='arrow-btn' onClick={this.navigateNext}>
                <svg stroke="currentColor" fill="currentColor"  color='#6F787C' viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                </button>
              </div>
            </div>
            </div>
            <div className='bottom'>
              <div className='bottom-left'>
                <img src="data:image/svg+xml,%3csvg%20width='68'%20height='96'%20viewBox='0%200%2024%2031'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20y='10.6879'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20y='10.6879'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20y='21.3756'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3crect%20x='10.6878'%20y='21.3756'%20width='9.31217'%20height='9.31217'%20rx='1.16402'%20fill='%234A4E54'/%3e%3c/svg%3e"
                  alt="question logo" className='widget-logo' />
              </div>
               <div className='slider-container'>
                <Slider {...settings} ref={sliderRef}>
                  {formData.map(each => (
                    <div className='card'>
                    <img src={each.imageUrl} alt="demo" className='images' />
                  </div>
                  ))}
                </Slider>
              </div>
              <div className='ver-line-1'>
              </div>
            </div>
          </div>
          <div className='line'></div>
        </div>
      </div>
    )
  }
}

export default App;
