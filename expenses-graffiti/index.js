import { createApp } from "vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiPersonalDataPlugin } from "@graffiti-garden/wrapper-vue-personal-data";

fetch("./data.json")
  .then((response) => response.json())
  .then((defaultExpenses) => {
    createApp({
      template: "#template",

      data() {
        return {
          myData: {
            expenses: defaultExpenses,
          },
        };
      },

      computed: {
        total_balance() {
          let total = 0;

          for (let expense of this.myData.expenses) {
            let trinity_paid = expense.trinity_paid ?? 0;
            let neo_paid = expense.neo_paid ?? 0;
            let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
            let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

            total +=
              (trinity_paid - neo_paid) / 2 +
              trinity_paid_for_neo -
              neo_paid_for_trinity;
          }

          return total;
        },
      },
    })
      .use(GraffitiPlugin, {
        graffiti: new GraffitiLocal(),
      })
      .use(GraffitiPersonalDataPlugin)
      .mount("#app");
  });
