# city-data-display
Pick 3 or more cities and display general data about them (temperature, sunrise time and sunset time)

## Dependencies:
- [Node.js](https://nodejs.org/en/)

## Building
To build the frontend simply use `npm install`
## Testing
No testing is implemented
## Running
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