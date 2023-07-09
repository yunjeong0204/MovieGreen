import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  background: linear-gradient(to bottom, #FF6699, #33CCFF
, #FF6699);
  color: #ffffff;
  padding: 2rem;

  
  .title {
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ffffff;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    flex-wrap: wrap; 
    gap: 1rem;
  }

  .black {
  color: #000;
  }

  .see-All,
  .see-NotAll {
    text-align: center;
    margin-top: 2rem;
  }

  .see-All button,
  .see-NotAll button {
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    background: #ffffff;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #cccccc;
    }
      
    }
    .deleteButton {
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      background: none;
      color: #000;
      border: 0.1rem solid #000;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      outline: none;

      &:hover {
        background: rgb(200, 228, 122);
        color: #fff;
      }
    }
  `

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    font-size: 50px;
    input {
      font-size: 50px;
      width: 130px;
      text-align: center;
    }

    button,
    .selectCountry {
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      background: none;
      color: #000;
      border: 0.1rem solid #000;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      outline: none;

      &:hover {
        background: rgb(200, 228, 122);
        color: #fff;
      }

&:hover {
  background-color: rgba(0, 0, 0, 0.1);
}


&:focus {
  border-color: #00bfff;
  box-shadow: 0 0 0.5rem rgba(0, 191, 255, 0.5);
}


&::-ms-expand {
  display: none;
}


&::after {
  content: "\\25BC";
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}
    }
  `;
const SelectGenre = styled.select`
margin: 0 0.5rem;
padding: 0.5rem 1rem;
background: none;
color: #000;
border: 0.1rem solid #000;
border-radius: 0.5rem;
cursor: pointer;
font-size: 1rem;
font-weight: bold;
outline: none;


&:hover {
  background-color: rgba(0, 0, 0, 0.1);
}


&:focus {
  border-color: #00bfff;
  box-shadow: 0 0 0.5rem rgba(0, 191, 255, 0.5);
}


&::-ms-expand {
  display: none;
}


&::after {
  content: "\\25BC";
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}
`;
const targetGenres = [
  { id: '28', name: '액션' },
  { id: '12', name: '어드벤쳐' },
  { id: '16', name: '애니메이션' },
  { id: '35', name: '코미디' },
  { id: '80', name: '범죄' },
  { id: '99', name: '다큐멘터리' },
  { id: '10751', name: '가족' },
  { id: '14', name: '판타지' },
  { id: '36', name: '역사' },
  { id: '27', name: '공포' },
  { id: '10402', name: '음악' },
  { id: '9648', name: '미스테리' },
  { id: '878', name: 'SF(Science Fiction)' },
  { id: '10770', name: 'TV 영화' },
  { id: '53', name: '스릴러' },
  { id: '10752', name: '전쟁' },
  { id: '37', name: '서부' },
];

function MovieListCustom({ targetDate, selectedGenre, targetCountry, handleGenreChange, handleDelete }) {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(8);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: '43af09871fd391abc84a35b271386b01',
              language: 'ko-KR',
              without_genres: '10749,18',
              year: targetDate,
              with_genres: selectedGenre,
              with_original_language: targetCountry === '한국' ? 'ko' : 'en',
            },
          }
        );
        const movies = response.data.results;
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [targetDate, selectedGenre, targetCountry]);

  const handleSeeMore = () => {
    setVisibleMovies(movies.length);
    setShowSeeMore(false);
    setShowSeeLess(true);
  };

  const handleSeeLess = () => {
    setVisibleMovies(4);
    setShowSeeMore(true);
    setShowSeeLess(false);
  };

  return (
    <MovieListBlock>
      <div className="title">
        {targetDate.slice(0, 4)}년
        <button onClick={() => handleDelete(targetDate)} className="deleteButton">
          삭제
        </button>
      </div>  
      <SelectGenre
        value={selectedGenre}
        onChange={(event) => handleGenreChange(event, targetDate)}
        className="selectGenre"
      >
        <option value="">모든 장르</option>
        {targetGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </SelectGenre>
      {movies && movies.length > 0 ? (
        <div className="content">
          {movies
            .filter((movie) => movie.vote_count > 0 && movie.backdrop_path !== null)
            .slice(0, visibleMovies)
            .map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
      ) : (
        <div className='black'> <br></br>영화 정보가 없습니다</div>
      )}
      {showSeeMore && (
        <div className="see-All">
          <button onClick={handleSeeMore}>더보기</button>
        </div>
      )}
      {showSeeLess && (
        <div className="see-NotAll">
          <button onClick={handleSeeLess}>접기</button>
        </div>
      )}
    </MovieListBlock>
  );
}

function MovieListCustomContainer() {
  const [inputValue, setInputValue] = useState('');
  const [targetDates, setTargetDates] = useState(
    JSON.parse(localStorage.getItem('targetDates')) || []
  );
  const [selectedGenres, setSelectedGenres] = useState(
    JSON.parse(localStorage.getItem('selectedGenres')) || {}
  );
  const [targetCountry, setTargetCountry] = useState('한국');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() !== '') {
      const newTargetDates = [inputValue, ...targetDates];
      setTargetDates(newTargetDates);
      localStorage.setItem('targetDates', JSON.stringify(newTargetDates));

      setInputValue('');
    }
  };

  const deleteItem = () => {
    const confirmDelete = window.confirm('추가한 연도를 정말로 모두 삭제하시겠습니까?');
    if (confirmDelete) {
      setTargetDates([]);
      setSelectedGenres({});
      localStorage.removeItem('targetDates');
      localStorage.removeItem('selectedGenres');
    }
  };

  const handleGenreChange = (event, targetDate) => {
    const { value } = event.target;
    setSelectedGenres((prevGenres) => ({
      ...prevGenres,
      [targetDate]: value,
    }));
  };

  const handleCountryChange = (event) => {
    setTargetCountry(event.target.value);
  };

  const handleDelete = (targetDate) => {
    const confirmDelete = window.confirm(`"${targetDate.slice(0, 4)}년"을(를) 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      const newTargetDates = targetDates.filter((date) => date !== targetDate);
      setTargetDates(newTargetDates);
      setSelectedGenres((prevGenres) => {
        const newGenres = { ...prevGenres };
        delete newGenres[targetDate];
        return newGenres;
      });
      localStorage.setItem('targetDates', JSON.stringify(newTargetDates));
      localStorage.removeItem('selectedGenres');
    }
  };
  const handleDeleteAll = () => {
    const confirmDelete = window.confirm('추가한 연도를 정말로 모두 삭제하시겠습니까?');
    if (confirmDelete) {
      setTargetDates([]);
      setSelectedGenres({});
      localStorage.removeItem('targetDates');
      localStorage.removeItem('selectedGenres');
    }
  };
  return (
    <>
      <ButtonContainer>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
        />
        년
        <button onClick={addItem} className="addItem">
          추가
        </button>
        <button
        onClick={handleDeleteAll}
        className="deleteItem"
        disabled={targetDates.length === 0}
      >
        모두 삭제
      </button>
        <select
          value={targetCountry}
          onChange={handleCountryChange}
          className="selectCountry"
        >
          <option value="한국">한국</option>
          <option value="외국">외국</option>
        </select>
      </ButtonContainer>

      <div>
        {targetDates.map((date) => (
          <div key={date}>
            <MovieListCustom
  targetDate={date}
  selectedGenre={selectedGenres[date] || ''}
  targetCountry={targetCountry}
  handleGenreChange={(event) => handleGenreChange(event, date)} 
  handleDelete={handleDelete}
/>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieListCustomContainer;