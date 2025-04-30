import './HomePage.css';
import Header from './Header/Header';
import BodySection from './BodySection/BodySection';
import AboutLearn from './aboutLearn/aboutLearn';
import Footer from './Footer/Footer';
const HomePage=()=> {

  
  return (
    <div className="App w-full overflow-hidden">

      {/* Header */}
      <Header/>

      {/* BodySection */}
      <BodySection/>

      {/* AboutLearn */}
      <AboutLearn/>

      {/* Footer */}
      <Footer/>
      
    </div>
  );
}

export default HomePage;
