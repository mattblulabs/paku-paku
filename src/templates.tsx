import render from 'preact-render-to-string';
import { h, FunctionComponent } from 'preact'

export function renderTemplate(Component: FunctionComponent<{}>) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${render(<Component />)}
    </body>
    </html>`
}

export function Index() {
    return <div class="container">
        <form>
            <label for="pacHost" >LS2 PAC Hostname</label>
            <input name="pacHost" id="pacHost" type="text"></input>
            <label for="searchTerm">Search</label>
            <input name="searchTerm" id="searchTerm" type="text"></input>
            <label for="startIndex">Starting Index</label>
            <input name="startIndex" id="startIndex" type="number" defaultValue="0"></input>
            <label for="hitsPerPage">Number of Hits</label>
            <input name="hitsPerPage" id="hitsPerPage" type="number" defaultValue="20"></input>
            <input type="submit" value="Get Data" />
        </form>
    </div>
}

export function createDataComponent(data: any) {
    return function () {
        return <div class="container">
            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>
        </div>
    }

}