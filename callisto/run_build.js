try {
  require('./build.js');
} catch (e) {
  console.log(e.name, e.message);
  console.log(e.stack.split('\n').slice(0, 5).join('\n'));
}
