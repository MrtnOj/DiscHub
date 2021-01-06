DiscHub is my first fullstack project using Node.js, express, MongoDb Atlas, React.

Backend is a very simple Node.js and express API which communicates with my MongoDb Atlas cloud database and also does some validation.

Front end is React and learning React was really the point of this project. I started writing this project as soon as I first learned how a React component works so the
code might not be very pretty. 

This application is developed mobile first because its main point is to give the user an easy way to mark scores on their phone while playing disc golf.
Main challenge was to make scoring as easy as possible and that mostly meant that scoring had to take as few clicks as possible. That's why I created my own numerical keyboard instead of using regular inputs.
There's an autocomplete when searching but I don't have many courses in my database yet so not all letters give an option.

There's also a weather feature -- choose the course name and get two day weather forecast. This is done using Openweathermap API. Weather feature might need a refresh on the first load, haven't looked into that yet.

Project has a very simple login system with e-mail and a password which will be hashed. Registered users can also see the data of all the roudns that they have saved.

Demo user --- 
E-mail: test@test.com
Password: Test123


Project is hosted at: https://frozen-river-07638.herokuapp.com/

Since it's hosted in the free tier, the first load of the app might take up to 15 seconds, because heroku servers unmount it if nobody visits after a while.
