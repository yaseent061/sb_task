import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

export default function BasicCard({ meal, click }) {
  return (
    <Card sx={{ minWidth: 275, margin: "20px" }} onClick={click}>
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
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
