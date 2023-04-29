import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Machine } from "../../constants/common";
import { ContainerBoxForServices } from "../../themes/ContainerBoxForServices";

export const CarsCatalogue = ({ cars, setCars }) => {
  return (
    <ContainerBoxForServices>
      {Machine.map((car) => (
        <Card
          key={car.iid}
          sx={{
            maxWidth: 345,
            width: 250,
            height: 250,
            gap: 2,
          }}
        >
          <img src={car.carUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.car}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ mt: 10, ml: 9 }}
              onClick={() => setCars(!cars)}
            >
              Book now
            </Button>
          </CardActions>
        </Card>
      ))}
    </ContainerBoxForServices>
  );
};
