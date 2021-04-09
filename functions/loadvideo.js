const getVideoUrl = require("./loadvideo/getVideoUrl");

exports.handler = async (event, context) => {
    const subPath = event.path.split('/')[3];   // PRE-CONDITION: path == '/api/loadvideo/*'
    console.log(event.path, subPath)
    if( subPath.startsWith("getVideoUrl") ) {
        return await getVideoUrl.handler(event, context);
    } else {
        return {
            statusCode: 404
        };
    }
}
