const ParcelProxyServer = require('parcel-proxy-server');

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './public/index.html',
  parcelOptions: {
    // provide parcel options here
    // these are directly passed into the
    // parcel bundler
    //
    // More info on supported options are documented at
    // https://parceljs.org/api
  },
  proxies: {
    '/api': {
      target: 'http://localhost:3030',
      changeOrigin: true,
      logLevel: 'debug'
    },
    // add proxies here
    '/oauth': {
      target: 'http://localhost:3030',
      changeOrigin: true,
      logLevel: 'debug'
    }
  }
});

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!');
});

// start up the server
server.listen(1234, () => {
  console.log('Parcel proxy server has started');
});
