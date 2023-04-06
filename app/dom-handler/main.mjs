import Api from "./Api.mjs";

const getActionName = () => {
    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    let action = params.get("action");
    if (action) {
        return action
    }
    return null;
}

const actionName = getActionName();
if (actionName) {
    //todo by service which resolves refs / links
    const actionsResponse = await fetch("/states/actions.json");
    /** @type {FluxEcoLearnplacesFrontendDomHandlerActions} actions */
    const actions = await (await actionsResponse.json());

    const filePathsResponse = await fetch("/states/file-paths.json");
    const filePaths = await (await filePathsResponse.json());

    const requestHandlerActionsResponse = await fetch("/api/readActions");
    const requestHandlerActions = await JSON.parse(await requestHandlerActionsResponse.json());

    const api = Api.new(
        {
            actions: actions,
            filePaths: filePaths,
            settings: {
                requestHandlerActions: requestHandlerActions
            }
        }
    );

    const currentUrl = new URL(window.location.href);
    const queryParams = await currentUrl.searchParams;
    //todo - extract to separate service, assert parameter types, assert required parameters
    const handleActionParameters = {};
    await Object.entries(actions[actionName].parameters).forEach(([parameterName, parameterSchema]) => {
        if (queryParams.has(parameterName)) {
            handleActionParameters[parameterName] = queryParams.get(parameterName);
        } else {
            handleActionParameters[parameterName] = {};
        }
    });
    console.log(handleActionParameters);

    api[actionName](handleActionParameters)
}