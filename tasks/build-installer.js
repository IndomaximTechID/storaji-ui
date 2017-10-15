const path = require('path')
const installer = require('electron-installer-windows')
const rootPath = path.join('./');
const outPath = path.join(rootPath, 'dist');
const iconUrl = 'https://raw.githubusercontent.com/IndomaximTechID/storaji-ui/dev/';

const options = {
  src: path.join(outPath, 'bin', 'storaji-win32-x64/'),
  dest: path.join(outPath, 'windows-installer', 'x64'),
  icon: path.join(outPath, 'assets', 'storaji.ico'),
  iconUrl: [iconUrl, 'src/assets/storaji.ico'].join(''),
  tags: [
    "Software",
    "Inventory",
    "Management",
    "System"
  ],
  animation: path.join(outPath, 'assets', 'storaji-install.gif'),
  noMsi: true,
  rename: function(dest, src) {
    var ext = path.extname(src)
    if (ext === '.exe' || ext === '.msi') {
      src = '<%= name %>-<%= version %>-setup-x64' + ext
    }
    return path.join(dest, src)
  }
}

console.log('Creating package (this may take a while)')
installer(options, function (err) {
  if (err) {
    console.error(err, err.stack)
    process.exit(1)
  }

  console.log('Successfully created package at ' + options.dest)

  options.src = path.join(outPath, 'bin', 'storaji-win32-ia32/');
  options.dest = path.join(outPath, 'windows-installer', 'x86');
  options.rename = function(dest, src) {
    var ext = path.extname(src)
    if (ext === '.exe' || ext === '.msi') {
      src = '<%= name %>-<%= version %>-setup-x86' + ext
    }
    return path.join(dest, src)
  }

  installer(options, function (err) {
    if (err) {
      console.error(err, err.stack)
      process.exit(1)
    }

    console.log('Successfully created package at ' + options.dest)
  })
})