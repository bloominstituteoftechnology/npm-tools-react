const JSDOMEnvironment = require("jest-environment-jsdom").default

class JSDOMEnvironmentExtended extends JSDOMEnvironment {
  constructor(...args) {
    super(...args)

    if (parseInt(process.version.match(/^v(\d+)/)[1]) >= 20) {
      this.global.File = File // this does not exist in Node V18
    }
    this.global.ReadableStream = ReadableStream
    this.global.TextDecoder = TextDecoder
    this.global.TextEncoder = TextEncoder
    this.global.Blob = Blob
    this.global.Headers = Headers
    this.global.FormData = FormData
    this.global.Request = Request
    this.global.Response = Response
    this.global.Request = Request
    this.global.Response = Response
    this.global.fetch = fetch
    this.global.structuredClone = structuredClone
  }
}

module.exports = JSDOMEnvironmentExtended
