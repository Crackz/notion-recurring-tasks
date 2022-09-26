import { App } from "./app";
import { CronJob } from "cron";

const app = new App();

const job = new CronJob(process.env.CRON_TIME as string, () => {
  app
    .execute()
    .then(() => console.log("Tasks Are Updated Successfully"))
    .catch((err) => {
      console.log("Failed To Update Tasks");
      console.error(err);
    });
});

job.start();
