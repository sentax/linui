import Terminal from "../Terminal"
export default ({ platform }) => {
    console.log(platform)
    return (
        <div>
            <h1>Platform</h1>
            <Terminal platform={platform} />
        </div>
    )

}