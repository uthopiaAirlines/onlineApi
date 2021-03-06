'use strict';

const routers = require('express').Router(),
  agent = require('../service/AgentService'),
  errorHandler = require('../utils/errorCodeHandler');

routers.delete('/agents/:agentId/clients/:clientId', async (req, res) => {
  if (req.body.verifiedSub != req.params.clientId) {
    res.status(403).send();
  }
  try {
    let result = await agent.agentsAgentIdAgentDELETE(req.params.agentId, req.params.clientId);
    res.status(200);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

routers.post('/agents/:agentId/clients/:clientId', async (req, res) => {
  if (req.body.verifiedSub != req.params.clientId) {
    res.status(403).send();
  }
  try {
    let result = await agent.agentsAgentIdAgentPOST(req.params.agentId, req.params.clientId);
    res.status(201);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

routers.get('/agents', async (req, res) => {
  try {
    let result = await agent.agentsGET();
    res.status(200);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

routers.get('/users/:id/agents', async (req, res) => {
  if (req.body.verifiedSub != req.params.id) {
    res.status(403).send();
  }
  try {
    let result = await agent.agentsGetByUser(req.params.id);
    res.status(200);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

module.exports = routers;