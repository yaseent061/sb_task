import React, { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import axios from "axios"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const MealModal = ({ showModal, handleClose, id = 0 }) => {
  const [meal, setMeal] = useState(null)
  useEffect(() => {
    const mealCall = async () => {
      if (id !== 0) {
        try {
          const tempData = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          )
          const tempMeal = tempData.data.meals[0]
          setMeal(filteredMeal(tempMeal))
        } catch (err) {
          console.log(err.message)
        }
      }
    }
    mealCall()
  }, [])

  useEffect(() => {
    console.log(meal)
  }, [meal])
  const filteredMeal = (meal) => {
    return {
      id: meal.idMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      name: meal.strMeal,
      img: meal.strMealThumb,
      ingredients: [
        Object.entries(meal)
          .filter(([key, value]) => {
            if (
              key.includes("strIngredient") &&
              value !== "" &&
              value !== null
            ) {
              return true
            }
          })
          .map((item) => item[1]),
        Object.entries(meal)
          .filter(([key, value]) => {
            if (key.includes("strMeasure") && value !== "" && value !== null) {
              return true
            }
          })
          .map((item) => item[1]),
      ],
      tags: meal.strTags,
      youtube: meal.strYoutube,
    }
  }
  return (
    <Modal className="parent" open={showModal} onClose={handleClose}>
      {meal ? (
        <Card sx={{ maxWidth: "70vw", margin: "20px" }}>
          <CardContent>
            <div className="info">
              <div>
                <img
                  src={meal.img}
                  alt="Dish img"
                  style={{ marginRight: "20px" }}
                />
              </div>
              <div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {meal.category}
                </Typography>
                <Typography variant="h5" component="div">
                  <b>{meal.name}</b>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {meal.area}
                </Typography>
              </div>
            </div>
            <div>
              <b>Ingredients</b> :{" "}
              <ul>
                {meal.ingredients[0].map((item, ind) => (
                  <li
                    key={ind}
                    style={{ textTransform: "capitalize" }}
                  >{`${item} - ${meal.ingredients[1][ind]}`}</li>
                ))}
              </ul>
            </div>
            <Typography variant="body2">
              <b>Instructions</b> : {meal.instructions}
            </Typography>
            <p>Tags : {meal.tags}</p>
          </CardContent>
          <CardActions>
            <a href={meal.youtube}>Watch on youtube</a>
          </CardActions>
        </Card>
      ) : (
        <h1 style={{ textAlign: "center", background: "white" }}>Loading...</h1>
      )}
    </Modal>
  )
}

export default MealModal
