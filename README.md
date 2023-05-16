# PEBKAC - The N3XTCODER fullstack developer challenge

## 1. Deduplication algorithm

Using a language of your choice, implement a function to deduplicate a list of words, 
so that, the function receives the list as an argument and returns the list without the 
duplicates. Here's an example in Javascript

```js
const wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son']

console.log(deduplicate(wordList))

[ 'not', 'a', 'pheasant', 'plucker', 'but', 'plucker\'s', 'son' ]
```
NB: the order of the output list does not matter.

There are many ways to do this - feel free to google your options. We want to see:

1. The function in syntactically correct (and readable) code.
2. An explanation of why you would choose this particular method.
3. A unit test!

### Solution

#### Prerequisites: make, node, npm

2. new Set() has linear complexity and therefore is a good choice for a function to remove duplicates from an array
3. A unit test has been added

To test the function:

```npm install```

```npm run test```

## 2. Booking system data schema

Imagine you are implementing a booking system for a peer2peer car share. 

User A, "Lender" needs to specify when their car is available, while user B, "Borrower" 
needs to be able to reserve the car at their preferred time. A car can only be lent to 
one person at a time.

What data schema would you need to store in order to support these use cases? Feel free 
to demonstrate a solution in your favourite datastore. The solution should support a simple 
query to show what cars are available at a given time (even if some bookings have already 
been made). You don't have to do it relational schema, but you have to show how the query
would look.

Here's an example in psuedocode to get you started:

```
+----------+
| car      |
+----------+
| id       |
| user_id  | 
| metadata |
+----------+

+----------+
| user     |
+----------+
| id       | 
| metadata |
+----------+

Relations:
car belongs to user  
```
There are many ways to do this - feel free to google your options. We want to see:

1. Some kind of schema (e.g. sqldump, JSON)
2. Example of how the query would look
3. Why is this solution better than some alternative?

### Solution

#### Prerequisites: Postgres DBMS

An SQL dump example:

```
CREATE TABLE Users (
id SERIAL PRIMARY KEY,
name VARCHAR(255)
);

CREATE TABLE Cars (
id SERIAL PRIMARY KEY,
owner_id INT,
make VARCHAR(255),
model VARCHAR(255),
FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE TABLE Bookings (
id SERIAL PRIMARY KEY,
borrower_id INT,
car_id INT,
start_time TIMESTAMPTZ,
end_time TIMESTAMPTZ,
FOREIGN KEY (borrower_id) REFERENCES Users(id),
FOREIGN KEY (car_id) REFERENCES Cars(id)
);

-- Seeding
INSERT INTO Users (name)
VALUES ('User A'),
('User B'),
('User C');

INSERT INTO Cars (make, model, owner_id)
VALUES ('Toyota', 'Camry', 1),
('Honda', 'Civic', 2),
('Ford', 'Focus', 3);

INSERT INTO Bookings (borrower_id, car_id, start_time, end_time)
VALUES (2, 1, '2023-05-17 09:00:00+00:00', '2023-05-17 12:00:00+00:00'),
(3, 3, '2023-05-18 14:00:00+00:00', '2023-05-18 16:00:00+00:00');
```

For the provided seeded bookings the following would give __booked cars__ for the range __2023-05-17 10:00:00 - 2023-05-17 12:00:00__:
```
SELECT c.id, c.make, c.model, c.owner_id
FROM Cars c
LEFT JOIN Bookings b ON c.id = b.car_id
WHERE (b.start_time, b.end_time) overlaps ('2023-05-17 10:00:00', '2023-05-17 12:00:00');
```

__available cars__ for the range __2023-05-17 10:00:00 - 2023-05-17 12:00:00__:
```
SELECT c.id, c.make, c.model, c.owner_id
FROM Cars c
WHERE c.id NOT IN (
    SELECT car_id
    FROM Bookings
    WHERE start_time <= '2023-05-17 10:00:00'
    AND end_time >= '2023-05-17 12:00:00'
);
```

show booked or not for the range __2023-05-17 10:00:00 - 2023-05-17 12:00:00__:

```
SELECT c.id, c.make, c.model, c.owner_id,
case
when (b.start_time, b.end_time) overlaps ('2023-05-17 10:00:00', '2023-05-17 12:00:00')
then true
else false
end as booked
FROM Cars c
FULL JOIN Bookings b ON c.id = b.car_id;
```


__Why is this solution better than some alternative?__

It makes use of Postgres 'overlaps' function. DBMS functions are very efficient and therefore making use of them should perform well even for large databases.

## 3. FrontOps

You have a frontend app written in ReactJS and you are preparing it for production. The app
needs to call an API server with a FQDN configured in the variable API_BASE_URL. There 
will be a production deployment and a staging deployment 
for demos/testing. How would you deploy the frontend so that the same build (minified JS, CSS
and HTML) can be used in production and staging deployments?

We want to see:

1. A description of how your implementtion would work, e.g. a docker file or a deployment config
2. A list of steps you need to take to change the FQDN of the API (API_BASE_URL) for production or staging
3. How would you handle new versions of the API?

## Submitting your solution

Please submit your solution as a PR including some nice commits for challenge 1 and the rest in Markdown.
