import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn:
    "https://de6deb1db67748989fc0c5e54b1ded5b@o155723.ingest.sentry.io/5652741",
});

const params = new URL(document.location).searchParams;
const queue = params.get("queue") || "na";

document.getElementsByTagName("body")[0].style.color =
  params.get("color") || "black";
document.getElementsByTagName("body")[0].style["font-size"] = `${
  (params.get("size") || 8) * 10
}px`;

async function getPlayerCount(queue) {
  let resp, url;

  if (queue === "eu") {
    url =
      "https://api.faceit.com/queue/v1/queue/hub/74caad23-077b-4ef3-8b1d-c6a2254dfa75";
  } else if (queue === "na") {
    url =
      "https://api.faceit.com/queue/v1/queue/hub/748cf78c-be73-4eb9-b131-21552f2f8b75";
  }

  resp = await axios.get(url);
  return resp.data.payload[0].noOfPlayers;
}

async function updatePlayerCounter() {
  document.getElementById("counter").innerHTML = await getPlayerCount(queue);
}

updatePlayerCounter();
setInterval(updatePlayerCounter, 30000);
