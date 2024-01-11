import './App.css';
import { Routes, Route } from 'react-router-dom';
import { TokenProvider } from './Components/Context/TokenContext';

import Header from './Components/Layout/Header/index';
import Footer from './Components/Layout/Footer/index';
import Main from './Components/Main/index';
import Clinic from './Components/User/Clinic';
import ImageSearch from './Components/User/ImageSearch';
import SearchHospital from './Components/User/SearchHospital';
import SearchDrugStrore from './Components/User/SearchDrugStrore';
import ChatBot from './Components/User/ChatBot';
import SignUp from './Components/Sign/SignUp';
import Login from './Components/Sign/Login';

import UserMyPage from './Components/User/MyPage/index';

function App() {
  return (
    <div className='App'>
      <TokenProvider>
        <Header />
        <Routes>
          <Route exact path='/*' element={<Main />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/clinic/*' element={<Clinic />} />
          <Route path='/imageSearch/*' element={<ImageSearch />} />
          <Route path='/chatBot/*' element={<ChatBot />} />
          <Route path='/searchHospital/*' element={<SearchHospital />} />
          <Route path='/searchDrugStore/*' element={<SearchDrugStrore />} />
          <Route path='/user/*' element={<UserMyPage />} />

          {/* <Main /> */}
        </Routes>
      </TokenProvider>
      <Footer />
    </div>
  );
}

export default App;
