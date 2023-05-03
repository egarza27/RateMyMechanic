# RateMyMechanic

Rate My Mechanic is an app created to facilitate the process of finding a reliable mechanic. Users will be able to find a mechanic that meets their criteria: location, price range, reviews, at-home service, in-shop service, etc. Users will be able to review the mechanics that they receive goods and services from.

## Data

There are three main data types: user data, vehicle data and review data. The users data is broken intow 4 seperate tables: users, usersAddress, usersContact, and usersCredentials. The usersReviews table holds the records for the reviews that each user creates. The usersVehicles table holds records about the vehicle that each user owns or operates.

## Data Relationships

The users table has a one to one relationship with the usersCredentials, usersContact, and usersAddress. The three tables are linked to the users table by a foreign key, user_id. The users table has a one to many relationship with the usersVehicles and usersReviews table. One user can have multiple vehicles and leave multiple reviews.
