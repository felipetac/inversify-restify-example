"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp        = require("gulp"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    runSequence = require("run-sequence"),
    nodemon     = require('gulp-nodemon');

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
    var config =  { formatter: "verbose" };
    return gulp.src([
        "src/**/**.ts"
    ])
    .pipe(tslint(config))
    .pipe(tslint.report());
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tstProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

gulp.task("build", function() {
    return gulp.src([
        "src/**/*.ts"
    ])
    .pipe(tstProject())
    .on("error", function (err) {
        process.exit(1);
    })
    .js.pipe(gulp.dest("dist/"));
});

//******************************************************************************
//* WATCH
//******************************************************************************
gulp.task('watch', ['lint', 'build'], () => {
    gulp.watch('src/**/*.ts', ['lint', 'build']);
});

//******************************************************************************
//* RUN
//******************************************************************************
gulp.task('run', function () {
    nodemon({ 
        legacyWatch: true, // Setei este parametro para evitar restart desnecessário
        script: 'dist/index.js', 
        ext: 'ts', 
        ignore: [
            'node_modules/'         
        ],
        tasks: ['lint', 'build']
    })
    .on('restart', function () {
        console.log('Restarted!')
    })
    .on('crash', function() {
        console.error('Application has crashed!\n')
        stream.emit('restart', 10)  // Restart o servidor a cada 10 segundos 
    })
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
  runSequence("lint", "build", "run", cb);
});