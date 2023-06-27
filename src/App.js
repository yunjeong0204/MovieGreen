import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import MovieList2005 from "./category/movieyear/MovieList2005";
import MovieList2010 from "./category/movieyear/MovieList2010";
import MovieList2015 from "./category/movieyear/MovieList2015";
import MovieList2023 from "./category/movieyear/MovieList2023";




import Signin from "./components/Signin";

import Detail from "./components/Detail";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: #e9ecef;
    color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/movie-year" element={
            <>
              <MovieList2023 />
              <MovieList2015 />
              <MovieList2010 />
              <MovieList2005 />
            </>
          }/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
