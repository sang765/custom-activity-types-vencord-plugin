import Plugins from "~plugins";

const PLUGINS = [
    require("./customActivityType").default,
];

for(const plugin of PLUGINS) {
    (plugin.tags ??= []).push("coc");
}

const name = Symbol("coc");
export default { name };

// This is called from api/Badges.ts, which is the first place that imports ~plugins
Set = new Proxy(Set, {
    construct(target, args) {
        if(Plugins && Plugins[name as any]) {
            Set = target;
            delete Plugins[name as any];
            for(const plugin of PLUGINS)
                Plugins[plugin.name] = plugin;
        }
        return Reflect.construct(target, args);
    }
});