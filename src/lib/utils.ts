export function prettyName(name: string) {
    return name.slice(0, 1).toUpperCase().concat(
        Array.from<string>(name.slice(1)).reduce((acc, v) => {
            return `${acc}${v.charCodeAt(0) < 97 ? ' ' + v.toLowerCase() : v}`
        }, '')
    )
}