import React from 'react';
import './assets/home.css'
import './assets/phone.css'
import './assets/historybook.css'
import Carsousel from '../components/Home/Carsousel'
import NhapTrieuChung from '../components/Home/NhapTrieuChung';
import Services from '../components/Home/Services';
import Post from '../components/Home/Post';
import Footer from '../components/Default/Footer';
// import Sercal from '../components/Home/SerCal';
import Header from '../components/Default/Header';
import Covid19 from '../components/Home/Covid19';
function Home () {
  console.log(process.env);
  console.log('a');
    return (
      <div className="body">
        <Header/>
        <Covid19/>
        <Carsousel></Carsousel>
        <NhapTrieuChung></NhapTrieuChung> 
        <Services></Services>
        {/* <Sercal></Sercal> */}
        <Post></Post>
        <Footer></Footer>
      </div>
    )
}

export default Home;
