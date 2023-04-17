
import AppOutbounds from "./AppOutbounds.mjs";
import App from "./App.mjs";

const outbounds = await AppOutbounds.read();
const webApp = await App.new(outbounds)
webApp.render()