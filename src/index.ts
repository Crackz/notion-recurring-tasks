import { Client } from "@notionhq/client";
import dotenv from "dotenv";

class App {
  private _notion: Client;

  constructor() {
    dotenv.config();
    this._notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
  }

  private async getDoneRecurringTasks() {
    const response = await this._notion.databases.query({
      database_id: process.env.NOTION_DB_ID as string,
      filter: {
        and: [
          {
            property: process.env.TASK_MANAGER_DONE_FIELD_NAME as string,
            checkbox: {
              equals: true,
            },
          },
          {
            property: process.env.TASK_MANAGER_NEXT_DUE_FIELD_NAME as string,
            formula: {
              string: {
                is_not_empty: true,
              },
            },
          },
        ],
      },
    });

    return response.results;
  }

  private async updateDoneRecurringTasks(tasks: any[]) {
    await Promise.all(
      tasks.map(async (task: any) => {
        await this._notion.pages.update({
          page_id: task.id,
          properties: {
            [process.env.TASK_MANAGER_DONE_FIELD_NAME as string]: {
              checkbox: false,
            },

            [process.env.TASK_MANAGER_DUE_FIELD_NAME as string]: {
              date: {
                start: this.getNextDueDate(task),
              },
            },
          },
        });
      })
    );
  }

  private getNextDueDate(task: any) {
    const dateStr =
      task.properties[process.env.TASK_MANAGER_NEXT_DUE_FIELD_NAME as string]
        .formula.string;

    const date = new Date(dateStr);
    return date.toISOString();
  }

  async start() {
    const tasks = await this.getDoneRecurringTasks();
    console.log(tasks);
    tasks.map((task: any) => {
      // console.log(task.properties);
    });

    await this.updateDoneRecurringTasks(tasks);
  }
}

const app = new App();

app
  .start()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
