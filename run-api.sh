curl --silent localhost:3000/heroes
# {"results":[{"id":"319d48b6-8548-40f2-b6f8-9208ea826cb4","name":"Batman","age":50,"power":"money"},{"id":"d0147ead-5856-4dc8-904e-840f2435a462","name":"Batman","age":50,"power":"money"}]}

curl \
  --silent \
  -X POST -d '{"name": "Flash", "age": 45, "power": "speed"}' \
  localhost:3000/heroes
# {"id":"e7967cfd-8ba2-4b9b-866e-a8c51d0eddd6","success":"Hero created successfully!"}

  curl \
  --silent \
  -X POST -d '{"invalid json payload"}' \
  localhost:3000/heroes
# {"error":"Internal Server Error"} 