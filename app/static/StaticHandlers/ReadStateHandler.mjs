export class ReadStateHandler {

    static new() {
        return new ReadStateHandler();
    }


    /**
     * @param {string} readStateActionEndpoint
     */
    async handle(readStateActionEndpoint) {
        const response = await fetch(readStateActionEndpoint);
        const result = await response.json();
        console.log(result)
        return result;
    }
}