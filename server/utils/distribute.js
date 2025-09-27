export const distributeItems = (items, agent) => {
  let result = [];
  agent.forEach((a) => (result[a._id] = []));
  let idx = 0;
  items.forEach((item) => {
    let agent = agent[idx];
    result[agent._id].push(item);
    idx = (idx + 1) % agent.length;
  });
  return result;
};
