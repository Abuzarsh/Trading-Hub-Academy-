import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

function AboutSection() { //commit 
  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#ffffff", // Set to white background only
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "2rem", color: "#000000" }} // Adjust text color to black for better contrast
      >
        What is Trading?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/05/85/33/24/360_F_585332472_NXIwwkCBvdqr7HDnLxFFQpuxWr6BxuEE.jpg"
                alt="Trading Basics"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Trading Basics
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Trading involves buying and selling assets like stocks, bonds,
                  and commodities.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/05/85/33/24/360_F_585332472_NXIwwkCBvdqr7HDnLxFFQpuxWr6BxuEE.jpg"
                alt="Types of Trading"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Types of Trading
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  There are various types of trading, such as day trading, swing
                  trading, and long-term investing.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/05/85/33/24/360_F_585332472_NXIwwkCBvdqr7HDnLxFFQpuxWr6BxuEE.jpg"
                alt="Market Analysis"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Market Analysis
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Successful trading requires understanding market trends and
                  using tools like technical analysis.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutSection;
