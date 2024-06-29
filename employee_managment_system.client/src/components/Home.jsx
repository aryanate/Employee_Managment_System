/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
function Home(props) {

    const navigate = useNavigate();
    const onButtonClick = () => {
        console.log("Working")
        navigate('/login');
    }
  return (
      <div className="mainContainer">
          <div className={'titleContainer'}>
              <div>Welcome!</div>
          </div>
          <div>Employee Managment System.</div>
          <div className={'buttonContainer'}>
              
              <input
                  className={'inputButton'}
                  type="button"
                  onClick={onButtonClick}
                  value={props.isAuthenticated ? 'Log out' : 'Log in'}
              />

          </div>
      </div>
  );
}

export default Home;