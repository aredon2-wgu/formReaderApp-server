import config from "config";

export default function (app) {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  if (!config.get("server.port")) {
    throw new Error("FATAL ERROR: server port is not defined.");
  }

  //Configuration
  console.log(`Application Name: ${config.get("name")}`);
  console.log(`Environment: ${app.get("env")}`);
  // console.log(`DB Password: ${config.get("database.dbPassword")}`);
}
