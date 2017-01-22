var awsLambda = require("node-aws-lambda");
var archiver = require("archiver");
var fs = require("fs");
var path = require("path");

fs.readdirSync(path.join(__dirname, "../dist"))
    .filter(filename => /\.js$/.test(filename))
    .map(filename => {
        var shortName = filename.replace(".js", "");
        var fullName = path.join(
            __dirname,
            "../dist/",
            filename
        );
        var packageName = path.join(
            __dirname,
            "../dist/",
            shortName + ".zip"
        );

        console.log("Creating package " + packageName);

        var output = fs.createWriteStream(packageName);
        var archive = archiver('zip', {
            store: true
        });

        archive.on('error', function(err) {
            throw err;
        });

        console.log("Adding " + filename);
        archive.pipe(output);
        archive.file(fullName, {name: filename});
        archive.finalize();

        output.on('close', function() {


            awsLambda.deploy(packageName, {
                region: 'eu-west-1',
                handler: shortName + '.handler',
                functionName: 'alexaOcado'
            }, function(err){
                if(err) {
                    throw err;
                }
                //fs.unlinkSync(packageName);
                console.log("Deployment of " + shortName + " completed");
            });

        });



    });