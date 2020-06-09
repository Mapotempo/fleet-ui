import { Server, Response } from "miragejs";


const initMock = (dataSet) => {
  new Server({
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
      // # Users Info API
      // ####################
      this.get("https://fleet.beta.mapotempo.com/api/0.1/user_info/:sync_user", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, { "errors": "Your are not authorized to perform this action" });
        let userInfos = dataSet[request.queryParams.api_key].userInfoSet[request.params.sync_user];
        if (!userInfos)
          return new Response(404, { "error": "Cette ressource n'existe pas" });
        return {"user_infos": userInfos};
      });
      this.get("https://fleet.beta.mapotempo.com/api/0.1/user_info", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, { "errors": "Your are not authorized to perform this action" });
        let userInfoSet = dataSet[request.queryParams.api_key].userInfoSet;
        if (!userInfoSet)
          return new Response(404, { "error": "Cette ressource n'existe pas" });
        return {"user_infos": Object.values(userInfoSet).flat()};
      });


      // ####################
      // # Users Settings API
      // ####################
      this.get("https://fleet.beta.mapotempo.com/api/0.1/user_settings/:sync_user", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, { "errors": "Your are not authorized to perform this action" });
        let userInfos = dataSet[request.queryParams.api_key].userSettingsSet[request.params.sync_user];
        if (!userInfos)
          return new Response(404, { "error": "Cette ressource n'existe pas" });
        return {"user_infos": userInfos};
      });
      this.get("https://fleet.beta.mapotempo.com/api/0.1/user_settings", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, { "errors": "Your are not authorized to perform this action" });
        let userInfoSet = dataSet[request.queryParams.api_key].userSettingsSet;
        if (!userInfoSet)
          return new Response(404, { "error": "Cette ressource n'existe pas" });
        return {"user_infos": Object.values(userInfoSet)};
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
      },
      { timing: 1000 }
      );

      this.get("https://fleet.beta.mapotempo.com/api/0.1/routes/:id", (schema, request) => {
        if (!checkCredential(dataSet, request.queryParams.api_key))
          return new Response(401, {"errors": "Your are not authorized to perform this action"});
        let route = dataSet[request.queryParams.api_key].routes.find(route => route.id === request.params.id);
        if (!route)
          return new Response(404, {"error": "Cette ressource n'existe pas"});
        return {"route": route};
      },
      { timing: 1200 });
    },
  });
};

const checkCredential = (dataSet, syncUser) => {
  return Object.keys(dataSet).includes(syncUser);
};

export default initMock;
