import { useState } from 'react';
import './App.css';


// Building in one component is considered bad practice, but
// Until I learn more about useEffect I'll be doing this all
// In one component.  Surely nothing will go wrong.

function App() {
  const [candyList, setCandyList] = useState()
  const getAllCandy = () =>{
    fetch('https://express-firestore-ajw.web.app/candy')
      .then(response => response.json())
      .then(data => setCandyList(data))
      .catch(alert)
  }

  const addNewCandy = (e) => {
    e.preventDefault()
    const newCandy = {
      name: e.target.name.value,
      size: e.target.size.value,
      price: e.target.price.value,
      calories: e.target.calories.value
    }
    if(newCandy.name && newCandy.size && newCandy.price && newCandy.calories){
      fetch('https://express-firestore-ajw.web.app/candy', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newCandy)
      })
        .then(getAllCandy)
        .catch(alert)
        .finally( () => {
          e.target.name.value = ''
          e.target.size.value = ''
          e.target.price.value = ''
          e.target.calories.value = ''
        })
    }
  }

  return (
    <main>
      <h1>Candy Store</h1>

      <h2>Add Candy</h2>
      <form onSubmit={addNewCandy}>
        <lable htmlFor="name">
          Name: <input type="text" name="name"></input>
        </lable> <br/>
        <lable htmlFor="size">
          Size: <input type="text" name="size"></input>
        </lable> <br/>
        <lable htmlFor="price">
          Price: <input type="text" name="price"></input>
        </lable> <br/>
        <lable htmlFor="calories">
          Calories: <input type="text" name="calories"></input>
        </lable> <br/>
        <input type='submit' value="Add Candy" />
      </form>

      <h2>All The Candy <button onClick={getAllCandy}>GET</button></h2>
      <table>
        <thead>
          <td>Name</td>
          <td>Size</td>
          <td>Price</td>
          <td>Cal</td>
        </thead>
        <tbody>
          {candyList && 
          candyList.map(candy => (
            <tr key="candy.id">
              <td>{candy.name}</td>
              <td>{candy.size}</td>
              <td>{candy.price}</td>
              <td>{candy.calories}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </main>
  );
}

export default App;
