import { Server, Response } from "miragejs";

var fleetMockServer = null;

export default (dataSet) => {
  fleetMockServer = new Server({
    routes() {
      // this.namespace = "/api";

      // ####################
      // # Users API
      // ####################
      this.get("https://fleet.beta.mapotempo.com/api/0.1/users/:sync_user", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        let user = dataSet[request.queryParams.api_key].users.find(u => u.sync_user === request.params.sync_user);
        if (!user)
          return new Response(404, {"error": "Cette ressource n'existe pas"});
        return {user: user};
      });

      this.get("https://fleet.beta.mapotempo.com/api/0.1/users/", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        return {users: dataSet[request.queryParams.api_key].users.filter(u => u.vehicle)};
      });

      // ####################
      // # Workkflow API
      // ####################
      this.get("https://fleet.beta.mapotempo.com/api/0.1/mission_status_types/", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        return {"mission_status_types": dataSet[request.queryParams.api_key].workflow.missionStatusTypes};
      });

      this.get("https://fleet.beta.mapotempo.com/api/0.1/mission_action_types/", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        return {"mission_status_types": dataSet[request.queryParams.api_key].workflow.missionActionType};
      });

      // ####################
      // # Route API
      // ####################
      this.get("https://fleet.beta.mapotempo.com/api/0.1/routes/", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        return {"routes": dataSet[request.queryParams.api_key].routes.map(route => {return {...route, missions: undefined};})};
      });

      this.get("https://fleet.beta.mapotempo.com/api/0.1/routes/:id", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        let route = dataSet[request.queryParams.api_key].routes.find(route => route.id === request.params.id);
        if (!route)
          return new Response(404, {"error": "Cette ressource n'existe pas"});
        return {"route": route};
      });
    },
  });
};

const checkCredential = (dataSet, syncUser) => {
  return Object.keys(dataSet).includes(syncUser);
};