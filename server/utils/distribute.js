export const distributeItems = (items, agents) => {
  const result = {};
  agents.forEach(a => { result[a._id] = []; });

  let idx = 0;
  items.forEach(item => {
    const currentAgent = agents[idx]; 
    result[currentAgent._id].push(item);
    idx = (idx + 1) % agents.length;
  });

  return result;
};