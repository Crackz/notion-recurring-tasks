import { App } from "./app";
import { CronJob } from "cron";

const app = new App();

// To Modify The CronJob Time
// Check https://crontab.guru/#*_*_*_*_*
const job = new CronJob("* * * * *", () => {
  app
    .execute()
    .then(() => console.log("Tasks Are Updated Successfully"))
    .catch((err) => {
      console.log("Failed To Update Tasks");
      console.error(err);
    });
});

job.start();
