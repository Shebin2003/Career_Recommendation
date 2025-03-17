import HomePage from './Pages/HomePage';
import QuestionsPage from './Pages/QuestionsPage';
import QuestionPage2 from './Pages/QuestionPage2';
import OutputPage from './Pages/OutputPage';
import OutputDetailsPage from './Pages/OutputDetailsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/question' Component={QuestionsPage}/>
          <Route path='/question2' Component={QuestionPage2}/>
          <Route path='/output' Component={OutputPage}/>
          <Route path='/outputdetails' Component={OutputDetailsPage}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path='/register' Component={RegisterPage}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
