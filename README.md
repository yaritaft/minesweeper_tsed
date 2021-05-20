# Table of Contents

- [Author](#Author)
- [Decisions](#Decisions)
- [Architecture](#Architecture)
- [Language](#Language)
- [Database](#Database)
- [Framework](#Framework)
- [Deployment](#Deployment)
- [DataStructure](#DataStructure)
- [Testing](#Testing)
- [Standards](#Standards)
- [Exercise](#Exercise)

### Author
Yari Ivan Taft

https://github.com/yaritaft/

### Decisions
#### Architecture

The architecture of this project was made by doing TDD and conceptos from DDD (domain driven design). The idea is to have a decoupled
architecture, that is why the core service is framework agnostic. Moreover, that is why every service is injectable, even the database.
The database can be replaced by modifying the ORM service without having to modify the rest of the code.( If interfaces are followed).

#### Language

Typescript was selected because of it's interoperability with backend and frontend and it's safety regarding stacic type checks.

#### Database

The database selected was postgres because It is easy to use and deploy with docker.

#### Framework

TSED was selected because of it's lightweightness, it's decorators and it's native object oriented concepts such as injecting services.

#### Deployment

Heroku was selected as cloud provider because it is really easy to use, with Procfile written the rest of the job is automatically done.

### How to run tests locally:
Create a .env file by copy and pasting .envdevcopy file content.
```
chmod 711 ./up
./up
npm run test
```


### How to deploy (dev notes)
With changes, commit them and do:
```
git push heroku master
```

### DataStructure

![](https://github.com/yaritaft/minesweeper_tsed/blob/master/documentation/Selection_248.png)

### Testing

The core application service is tested with Integration testing, to make sure the core application service remains working properly after applying new changes.

### Code formatter and Standards

- ESLint
- Typescript
- Prettier

### Security Concerns

JWT and sessions must be implemented to improve the authentications. Also cognito would be useful to avoid storing the password in the database.
To improve the basic Security applied, the password field has a base64 encoded password + salt.
The salt is also stored in the database on the user record.

### Exercise

API test

We ask that you complete the following challenge to evaluate your development skills. Please use the programming language and framework discussed during your interview to accomplish the following task.

PLEASE DO NOT FORK THE REPOSITORY. WE NEED A PUBLIC REPOSITORY FOR THE REVIEW. 

## The Game
Develop the classic game of [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game))

## Show your work

1.  Create a Public repository ( please dont make a pull request, clone the private repository and create a new plublic one on your profile)
2.  Commit each step of your process so we can follow your thought process.

## What to build
The following is a list of items (prioritized from most important to least important) we wish to see:
* Design and implement  a documented RESTful API for the game (think of a mobile app for your API)
* Implement an API client library for the API designed above. Ideally, in a different language, of your preference, to the one used for the API
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Detect when game is over
* Persistence
* Time tracking
* Ability to start a new game and preserve/resume the old ones
* Ability to select the game parameters: number of rows, columns, and mines
* Ability to support multiple users/accounts
 
## Deliverables we expect:
* URL where the game can be accessed and played (use any platform of your preference: heroku.com, aws.amazon.com, etc)
* Code in a public Github repo
* README file with the decisions taken and important notes

## Time Spent
You need to fully complete the challenge. We suggest not spending more than 3 days total.  Please make commits as often as possible so we can see the time you spent and please do not make one commit.  We will evaluate the code and time spent.
 
What we want to see is how well you handle yourself given the time you spend on the problem, how you think, and how you prioritize when time is sufficient to solve everything.

Please email your solution as soon as you have completed the challenge or the time is up
