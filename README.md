# City-data
Shows information from selected cities

## Components

### [city-data-gather](./city-data-gathering "backend component")
Gathers data from multiple external API's and processes them in order to display it

#### Dependencies:
- [Node.js](https://nodejs.org/en/)
- [jsdoc](https://jsdoc.app/) (optional for documentation)


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
$ docker run --name city-gather -d -p 8000:8000 city-gather -v city-gather-volume:/app
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


## Code Documentation
Internal functions are documented.
Documents are provided in the `docs` directory but it is possible to generate them with the command `npm run docs`.

RESTful API is not documented as it only serves one endpoint (`/cdg/city_data`).
Argument for the API endpoint is a csv list of cities.

A request to the API would be similar to the following
```
$ curl -D GET \ 
    -H "Accept: application/json" \
    "http://<BACKEND_IP>:<BACKEND_PORT>/cdg/city_data?city_list=<CITY_LIST>"
```
Where `BACKEND_IP` is the deployment address, `BACKEND_PORT` is the deployment port and `CITY_LIST` is the csv list of cities to get info.

DISCLAIMER: If it is sent anything other then a csv list of cities then the request won't be processed.


### [city-data-display](./city-data-display "frontend component")
Pick 3 or more cities and display general data about them (temperature, sunrise time and sunset time)

#### Dependencies:
- [Node.js](https://nodejs.org/en/)

#### Building
To build the frontend simply use `npm install`
#### Testing
No testing is implemented
#### Running
You can run the application in your own machine with the following command:
```
$ npm run start
```

Be advised that this was developed for a linux system with Node.js so there is no guarantee it will work in MS Windows systems as is.

## How to use
To use this component go to `localhost:3000` to get this webpage
![webpage](/images/initial.png)

In the text area insert the cities list to get the temperature, sunrise time and sunset time. 

Then press search and it will redirect to a page similar like this one (in this case the cities searched were Lisbon, Oport, Boston and Sydney) 
![show_city](/images/show_cities.png)

To note, the sunrise and sunset times are in GMT+0000, so in cases like Sydney (GMT+1100) and Boston (GMT-0500), the time will be adjusted to the GMT time.

In this case Sydney local time for sunrise is 5:35 am and for sunset is 7:53 pm but after time adjustments for GMT (-11 hours) it becomes 6:35 pm and 8:53 am, respectively.

The same happens with Boston but the time adjustment is of +5 hours instead of -11.

The table is also sortable by column, to do it just click on the title of the column
