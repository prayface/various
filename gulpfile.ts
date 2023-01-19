const Gulp = require("gulp");
const CopyTask = require("./builds/tasks/copy");
const TypesTask = require("./builds/tasks/types");
const CreateTask = require("./builds/tasks/create");
const StylesTask = require("./builds/tasks/styles");
const ModulesTask = require("./builds/tasks/modules");

exports.default = Gulp.series(CreateTask, StylesTask, ModulesTask, TypesTask, CopyTask);
