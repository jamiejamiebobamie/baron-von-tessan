![Heroku](https://pyheroku-badge.herokuapp.com/?app=baron-von-tessan)


This is a drawing app, originally started during a software engineering internship sponsored by CodeLabs.

Users add to Baron von Tessan's kingdom by drawing whatever they wish and then adding a short description of what they drew.

The frontend uses node/express, React.js, and custom UI elements rendered in p5.js.

Users can draw new drawings as well as view and like previously submitted drawings.

The backend was built using Flask and MongoDB.

I experimented with an animate drawings feature that allows users to draw a drawing and then select portions of their drawing to "redraw". The user can watch the selected portion interpolate from [the orginal position to the new one](https://www.youtube.com/watch?v=WJQoUw7dcF4) .

https://baron-von-tessan.herokuapp.com

Note: The site may be down due to too much traffic. (It is hosted on Heroku using the free-tier, which only allows so much traffic across my apps per month.)
