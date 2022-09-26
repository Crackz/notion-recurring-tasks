# Notion Recurring Tasks

- This repo is based on [notion-sdk-typescript-starter](https://github.com/makenotion/notion-sdk-typescript-starter)

- Works with Thomas Frank's Ultimate [Tasks](https://thomasjfrank.com/templates/task-and-project-notion-template/) / [Brain](https://thomasjfrank.com/brain/)

### Usage
- Clone this repo & install dependencies
- [Create notion token with read & update content capabilities](https://developers.notion.com/docs/getting-started#step-1-create-an-integration) 
- [Allow the token to access the tasks DB & get the DB ID](https://developers.notion.com/docs/getting-started#step-2-share-a-database-with-your-integration)
- Update **```NOTION_TOKEN```** & **```NOTION_DB_ID```** in **.env.example** file then rename the file to be **.env**

- Create a recurring task in the tasks db and mark it as done then you can run the app through ```npm run start``` to test your integration if everything went well then build the app through ```npm run build```

- To run it in the background you have a lot of options
    1. you can deploy it to any free nodejs hosting
    2. you can use PM2 to deploy it to your own pc / server (check ecosystem.config.js)
