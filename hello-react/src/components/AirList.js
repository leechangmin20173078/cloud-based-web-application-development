import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import AirItem from './AirItem';
import axios from 'axios';


const AirListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;


const AirList = ({category}) => {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

        useEffect(() => {
            // async를 사용하는 함수 따로 선언
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                    `http://localhost:3001/api?sidoName=${category}`,
                        );
                    setArticles(response.data.response.body.items);
                    //console.log(response.data.response.body.items)
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            };
            fetchData();
        }, [category]);

        // 대기 중일 때
        if (loading) {
            return <AirListBlock>대기 중…</AirListBlock>;
        }
        // 아직 articles 값이 설정되지 않았을 때
        if (!articles) {
            return null;
        }
        // articles 값이 유효할 때
        return (
            <AirListBlock>
                {articles.map(article => (
                    <AirItem key={article.stationName} article={article} />
                ))}
            </AirListBlock>
        );
};



export default AirList;