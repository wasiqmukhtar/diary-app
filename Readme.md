# EasyNotes Application

DiaryQuick. A simple diary application that can be used by multiple people

## Steps to Setup

1. Install dependencies

```bash
npm install express body-parser mongoose promise --save
```

2. Run Server

```bash
node server.js
```

You can browse the apis at <http://localhost:3000>

## Tutorial
Run a REST API testing tool such as Postman or SOAP UI.

// All requests must have header : content-type : application/json

1. List all the users

-- GET "localhost:3000/users"

2. Create a new user using :

-- POST - "localhost:3000/new_user" 

In the request body send a raw json with your username and password as such :
    {
        "username" : "WasiqMukhtar",
        "password" : "2+2=3"
    }

3. If users are present use one of the users - _id to list or create entries to the diary

This can be done in the following way :

4. Create new entry for diary :

-- POST - "localhost:3000/diary" 
    {
        "title" : "Awesome Day",
        "content" : "Blah blah blah sun shining etc etc",
        "user_id" : "This you get from listing users"
    }

5. List all entries in diary (You must know the user _id to list all the entries of his diary):

-- GET - "localhost:3000/diary/:userId"

6. Get a single page from the diary using the entry or page _id :

-- GET - "localhost:3000/diary/pages/:pageId"

7. Update the entry to one page of the diary using the entry or page _id : 

-- PUT - "localhost:3000/diary/pages/:pageId"

8. Delete a single entry in the diary : 

-- DELETE - "localhost:3000/diary/pages/:pageId"

9. Delete all the entries of the diary :

-- DELETE - "localhost:3000/diary"
