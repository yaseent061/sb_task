import React, { useEffect } from "react"
import { Modal } from "@mui/material"
import axios from "axios"

const MealModal = ({ showModal, handleClose, id = 0 }) => {
  useEffect(() => {
    const mealCall = async () => {
      if (id !== 0) {
        try {
          const tempData = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          )
          console.log(tempData.data.meals)
        } catch (err) {
          console.log(err.message)
        }
      }
    }
    mealCall()
  }, [])
  return (
    <Modal className="parent" open={showModal} onClose={handleClose}>
      <div className="modal">
        <h1 style={{ textAlign: "center" }}>Meal</h1>
      </div>
    </Modal>
  )
}

export default MealModal
