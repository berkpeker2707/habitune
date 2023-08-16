To Run Docker Image
(change version :1.0 of new images)

- docker build -t habitunecontainer:1.0 .

To Build the Docker Image

- docker run -d -p 1111:1111 habitunecontainer:1.0
  (docker port is usually same with the api, but you can expose different port)
