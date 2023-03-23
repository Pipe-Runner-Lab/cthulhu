export const extractScriptText = async (script) => {
  return await (await fetch(script)).text();
};