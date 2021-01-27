import React, {useState} from 'react';
import { Route , Link, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';
import axios from 'axios';
import AirPage from './components/AirPage';

const App = () => {


    const [data, setData] = useState(null);

    const onClick = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/api?sidoName=경남',
            );
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                <Link to="/about">소개</Link>
                </li>
                <li>
                    <Link to="/profiles">프로필</Link>
                </li>
                <li>
                    <Link to='/history'>History 예제</Link>
                </li>
                <li>
                    <Link to='/api'>Api 예제</Link>
                </li>
            </ul>
            <hr/>
            <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path={["/about", "/info"]} component={About} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/history" component={HistorySample} />
            <Route path="/api/:category?" component={AirPage} />
                <Route
                    // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
                    render={({ location }) => (
                        <div>
                            <h2>이 페이지는 존재하지 않습니다:</h2>
                            <p>{location.pathname}</p>
                        </div>
                    )}
                />
            </Switch>

            <div>
                <div>
                    <button onClick={onClick}>불러오기</button>
                </div>
                {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
            </div>


        </div>
);
};

export default App;