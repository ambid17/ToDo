# ToDo-Web
To Do : a small task management app utilizing:
- front end: React and NextJS
- back end: Asp.Net Core and Entity Framework Core

# Setup
- to set up and run each of the components (API/Web) the projects include their own readme files

# Thought Process
- The prompt is incredibly vague: To Do's and Task Management imply vastly different outcomes.
	- To Do: what comes to mind is the iOS reminders app. You need lists of reminders with due dates, and the ability to order them
	- Task Management: what comes to mind is something like Jira or Trello. It is largely the same dataset as To Do's with a UI layer on top.
		- there are nearly infinite sub-features to account for the different ways teams want to interact with their data and apply business rules.
- The next question is then: Who is the customer?
	- If the customer is internal:
		- Why is this app necessary? What differentiates the app from using something like Trello?
		- The common reason would be simply because one already has access to the necessary data to make the application
			- I am thinking something along the lines of combining help desk issues, Jira ticket, outlook calendar, etc.
	- If the customer is external:
		- What is the competitive advantage of the app?
			- we likely aren't competing with something like Jira as they already succumb to the "too many features" problem.
			- Thus, what we need to stand out is a novel way to display or interact with the same data set that feels more fluid.
				- This is a larger UX Design issue than can be solved in this test, but if I were to tackle this for real, that would be where my head is at.
- What does "MVP" mean in terms of architecture?
	- Needs to be easy to build off of, but without the tradeoff of too much abstraction to slow down extensions to the project.
	- In my experience, the purpose of an MVP is to get to market as fast as humanly possible, and get customer feedback.
		
# Assumptions
- To keep it fun, let's assume the stakeholders need something in between the iOS reminders app and Trello, but with integrations for internal datasets.
	- reasoning: this lets us tackle the internal customer route. If I wanted to target the external customer, I would spend more time thinking of a novel UX and that's not the purpose of this exercise.
- The goal is to keep time-to-market while not entirely sacrificing maintainability
	- reasoning: if I made an MVP that was awful to add on to, it might as well be re-worked from the ground up. On the other hand, if I spend the time to make the application work for every case, it can be impossible to move forward with any speed.
# Architecture decisions

## Repository
- to ensure setting up the project is as straightforward as possible, I have decided on a mono-repo approach.
	- this means each of the projects themselves will have their own gitignore and README for setup, but can be deployed separately.
## Database
- SQLite vs EF-in-memory database
	- I chose SQLite's in-memory database as it's also perfect to be re-used if we wanted to set up unit tests isolated from the prod database.
	- This also lets me commit some saved info to see how the application looks with dummy data right as you load up.
## Front end
- Libraries:
	- Tanstack Query and Axios - chosen to keep things simple for API interactions
		- the project isn't large or complex enough to warrant the additional complexity of something like Redux.
	- React Bootstrap - Again, very straightforward and lightweight. Lets front end developers override components with ease.


# Further improvements
## Scalability
There are so many places to improve the application, so I will break this out into front end vs backend

### Front end
- implement virtualized data. Only show Tasks that are visible, and lazy load them as they become visible
- instead of loading ALL of the task lists up front, we could either paginate, or only load the non-completed tasks until the user needs that information


### Back end
- Implementing WebSockets to stream the small set of changes and prevent an entire data refresh would be the biggest bang for your buck.
- I can imagine a world where if this was an external tool and we had some large customers, it would make sense to split databases per large partner
- If there are time frames where we are receiving bursty traffic, a load balancer and message queue would absorb a lot of that pressure
- We could make some calculated tables using triggers to have, for example, a "non-completed task" query super optimized

## Maintainability

### Front end
- Testing
	- There's already a massive miss in unit tests that would've made even this small PoC go smoother
- Storybooks
	- Create a pre-made UI library with company branded assets and uniform components

### Back end
- Code splitting
	- Since the current set of requests was small enough, it felt unnecessary to split them out into separate controllers
		- its at about the limit of readability, and I almost wanted to split them out to separate Task and TaskList controllers, but I wanted it to be simple to read through.
- EFCore code first rules
	- currently I didn't apply any entity ruels about minimum length of task names, etc.