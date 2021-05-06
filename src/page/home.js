import React,{ Component } from 'react';
import './assets/home.css'
import './assets/phone.css'
import Carsousel from '../components/Home/Carsousel'
import NhapTrieuChung from '../components/Home/NhapTrieuChung';
import Services from '../components/Home/Services';
import Post from '../components/Home/Post';
import Footer from '../components/Default/Footer';
import Sercal from '../components/Home/SerCal';
import Header from '../components/Default/Header';
class Home extends Component {
  render () {
    return (
      <div className="body">
        <Header></Header>
        <Carsousel></Carsousel>
        <NhapTrieuChung></NhapTrieuChung> 
        <Services></Services>
        <Sercal></Sercal>
        <Post></Post>
        <Footer></Footer>
      </div>
    )

  };
}

export default Home;
