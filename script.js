/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-mutable-exports */
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  rps: 100,
  vus: 50,
  duration: '1m',
};

export default function() {
  let randResId = Math.floor(Math.random() * 1000000);
  let randDishId = Math.floor(Math.random() * 10 + 1);
  let res1 = http.get(`http://localhost:5001/api/popularDish/${randResId}`);
  check(res1, {
    "status was 200": (res) => res.status == 200,
    "transaction time OK": (res) => res.timings.duration < 200
  });
  
};

// post test
let url = `http://localhost:3002/api/popularDish/${randResId}`;
let payload = JSON.stringify({
  'popular_dish_id': 12,
  'restaurant_id': randResId,
  'dish_image': "https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/999.jpg",
  dish_name: "aspernaturs",
  price_dish: 46,
  photo_count: 65,
  review_count: 27
});
let params =  { headers: { "Content-Type": "application/json" } }
http.post(url, payload);