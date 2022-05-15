import axios from "axios"
import React, { useEffect, useState } from "react"
import BasicCard from "./components/BasicCard"
import MealModal from "./components/MealModal"
import "./App.css"

const App = () => {
  const [allMeals, setAllMeals] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    const mealCall = async () => {
      try {
        const tempData = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
        )
        const tempMeals = tempData.data.meals
        setAllMeals([...tempMeals])
      } catch (err) {
        console.log(err.message)
      }
    }
    mealCall()
  }, [])

  const filteredMeal = (meal) => {
    return {
      id: meal.idMeal,
      category: meal.strCategory,
      area: meal.strArea,
      name: meal.strMeal,
      img: meal.strMealThumb,
    }
  }

  const openModal = (id) => {
    setCurrentId(id)
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div>
      {showModal ? (
        <MealModal
          showModal={showModal}
          handleClose={handleClose}
          id={currentId}
        />
      ) : null}
      <h1 style={{ textAlign: "center" }}>Meal App</h1>
      {allMeals.length > 0 ? (
        allMeals.map((item, ind) => (
          <BasicCard
            meal={filteredMeal(item)}
            key={ind}
            click={() => openModal(item.idMeal)}
          />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default App
