# City-data
Shows information from selected cities

## Components

### [city-data-gather](./city-data-gathering "backend component")
Gathers data from multiple external API's and processes them in order to display it

#### Dependencies:
- [Node.js](https://nodejs.org/en/)


#### Building:
To build the backend simply use `npm install` or build the docker volume and container
```
$ docker build -t city-gather:latest ./city-data-gathering
$ docker volume create city-gather-volume
```

#### Testing:
To test simply run `npm test`


#### Running:
You have the option to run the container by using either the compose or the docker CLI
```
$ docker run --name city-gather -d -p 8000:8000 city-gather -v vity-gather-volume:/app
```
After executing one of the aforementioned commands check if the `docker ps` output is similar to this
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
5e2938573495        city-gather         "docker-entrypoint.s…"   4 seconds ago       Up 4 seconds        0.0.0.0:8000->8000/tcp   city-gather
```


Optionally you can run the application in your own machine with teh following command:
```
$ npm run start
```

Be advised that this was developed for a linux system with Node.js so there is no guarantee it will work in MS Windows systems as is.

#### Logging and Debugging
The application automatically writes it's logging steps in logs/app.log.
To access this data in the docker volume execute the following
```
$ docker volume inspect city-gather-volume
[
    {
        ...
        "Mountpoint": <VOLUME-DIRECTORY>
        ...
    }
]
$ cd <VOLUME-DIRECTORY>/_data/logs
$ cat app.log
```

If your user does not have the proper docker permissions try using superuser permissions (`su -`) or check your user groups permissions 


### [city-data-display](./city-data-display "frontend component")
Pick 3 or more cities and display general data about them (temperature, sunrise time and sunset time)

#### Dependencies:
- [Node.js](https://nodejs.org/en/)

#### Building
#### Testing
#### Running



