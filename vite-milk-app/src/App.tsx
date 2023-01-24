import './App.css'
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';


function App() {


  return (
    <div className="App">
      <nav>
        <div className="menu">
          <Link to="/"><img src="./public/milk.png" alt="Milk pic" width="30" height="30"></img></Link>
          <Link to="/">THE MILK STORE</Link>
          <Link to="/cart">CART</Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  )
}

export default App