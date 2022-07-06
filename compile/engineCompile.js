const fs = require('fs');
const readline = require('readline');
const Path = require('path');

const host = "https://jecodelesoir.github.io/MiaouEngine/";
const TsConfig = require('../tsconfig.json');

const SrcFolder = Path.resolve(__dirname, '../src');
const BuildFolder = Path.resolve(__dirname, '../Build');
let DistFolder;

FileChange();
const Files = findFile(SrcFolder, 'ts');
Files.forEach(file => {
    WatchFile(file)
})



//watch file
function WatchFile(file) {
    console.log(` watch File ${file}`);
    fs.watch(file, (event, filename) => {
        if (event === 'change') {
            console.log(`File ${filename} has been changed`);
            FileChange()
        }
    });
}

function FileChange() {


    //call cmd npx tsc
    let cmd = "npx tsc";

    console.log(cmd);

    require('child_process').exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            console.log(stderr);
            console.log(stdout);
            return;
        }
        else {
            DistFolder = Path.resolve(__dirname, '../dist');
            const Files = findFile(DistFolder);
            Files.forEach(file => {
                ReadFile(file);
            })
        }
    });
}


//recursive function find file
function findFile(path, ext = "js", results = []) {
    let files = fs.readdirSync(path);
    for (let file of files) {
        if (fs.statSync(path + '/' + file).isDirectory()) {
            results = findFile(path + '/' + file, ext, results);
        } else {
            if (file.indexOf('.' + ext) > -1) {
                if (!(file.indexOf('.' + ext + '.map') > -1)) {
                    results.push(Path.resolve(path, file));
                }
            }
        }
    }
    return results;
}

function ReadFile(file) {
    let results = [];

    let rl = readline.createInterface({
        input: fs.createReadStream(file)
    });

    rl.on('line', function (line) {


        //find //# sourceMappingURL

        if (line.indexOf('//# sourceMappingURL') > -1) {
            return;
        }

        //find import
        if (line.indexOf('import') > -1) {
            //replace string import
            line = line.replace(/\"/g, "'");

            if (line.indexOf('@') > -1) {
                //replace string '@name'
                //TsConfig.compilerOptions.paths[path] 

                line = line.replace(/'@([^']+)'/g, function (match, _name) {

                    console.log("==Name :" + _name);
                    console.log(TsConfig.compilerOptions.paths);

                    let name_end = "";
                    let name = _name;
                    let r_name = "";

                    if (name.indexOf('/') > -1) {
                        name = _name.split('/')[0];
                        name_end = _name.replace(name, '');
                    }

                    let path = TsConfig.compilerOptions.paths["@" + name];

                    if (!path) {
                        r_name = "/*"
                        path = TsConfig.compilerOptions.paths["@" + name + "/*"];
                    }

                    if (!path) {
                        r_name = "/*/**"
                        path = TsConfig.compilerOptions.paths["@" + name + "/*/**"];
                    }

                    path = path + "";
                    path = path.replace(r_name, "");



                    if (path) {
                        return `'` + host + path + name_end + `'`;
                    }

                    return match;
                });
            }

            if (!(line.indexOf('.js') > -1)) {
                line = line.replace(/import\s+([^\s]+)\s+from\s+'([^']+)';/g, function (match, name, path) {
                    console.log(match, name, path)
                    return `import ${name} from '${(path + ".js")}';`;
                });

                //replace string import { * }
                line = line.replace(/import\s+\{([^}]+)\}\s+from\s+'([^']+)';/g, function (match, name, path) {
                    return `import { ${name} } from '${(path + ".js")}';`;
                });
            }

        }

        results.push(line);

    });

    rl.on('close', function () {
        //console.log(results);
        //remove DistFolder in file

        let new_path = file.replace(DistFolder, BuildFolder);
        let folder = Path.dirname(new_path);
        fs.mkdirSync(folder, { recursive: true });
        fs.writeFileSync(new_path, results.join('\n'));
    });
}


