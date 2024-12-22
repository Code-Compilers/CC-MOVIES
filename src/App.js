import Row from "./components/Row";
import './App.css';

function App() {
  return (
    <div className="App">

      <Row title="Popular Movies" fetchUrl="/movie/popular"/>
      <Row title="Top Rated" fetchUrl="/movie/top_rated"/>
      <Row title="Upcoming Movies" fetchUrl="/movie/upcoming"/>
      
    </div>
  );
}

export default App;
