# API Pathfinder / Hashlate

## Synopsis
API Pathfinder is a web application that parses an API’s JSON/XML object and generates the key path for any specific attribute. By displaying an object in an easy to read format as well as generating the key path for any element you click, this app is a easy beginner’s tool when working with large API packages.

## How to Use
API Pathfinder is an extremely easy to use application. Whenever you are working with an API endpoint and are expecting some sort of data package, you can simply place that URL into the search bar. It will then display its contents, indented by its level of nesting. You can then click on any element and it will display in a separate box, the key path you can simply copy and paste in your code.

## How it Works
It essentially parses an API response and transforms it into one large html string. Each element is wrapped in html code and tagged with the key path within an html’s data-tag.

The application relies on a recursive method that identifies each element as either a collection (array or object) or as a single element (string, integer, etc.). So long as it runs into another collection, it will call itself on that collection. The recursive method’s base case is when it hits a single element, which it turns into a string and returns. The end result will be every element wrapped in html tags and concatenated into one html string which it displays on the page.

jQuery was used to make each element clickable, generating the key path without reloading the page. This was necessary because this program does not use a database, thus refreshing the page will simply erase whatever was displayed.

## Obstacles
### Overflowing the Browser Stack
As the size and level of nesting for an API’s JSON/XML object is unknown, I believed a recursive method would be the best way to address the issue. However, it overwhelmed the browser’s stack (chrome, firefox). However, with a bit of refactoring and moving it to the controller fixed the issue.

### Storing the Key Path without a Database
I avoided using a database for this application because of how potentially large the database would have to be, growing with each API request. I decided to use HTML’s data attribute to store the key path and use jQuery to retrieve and display the path without refreshing the page.


## Origin
I originally built an even simpler version of API Pathfinder during a project I was working on with my classmates. For this project, we worked with large JSON packages riddled with nested within nested objects and arrays. Although we used ‘awesome print,’ we still hit road-bumps when we slightly misread the key path within an element. To quickly mitigate this problem, I wrote this program in my free time to use and smooth out my workflow.

## Feedback
The API Pathfinder’s functionality pales in comparison to other programs like Postman, but if you are a beginner or you do not want to deal with learning/installing Postman, I hope this is a good alternative. However, as it is a simple and small application, please feel free to email me feedback or angry hate mail. I would love to implement your feedback to make this a more useful tool.

## License
MIT License




<tt>rake doc:app</tt>.
