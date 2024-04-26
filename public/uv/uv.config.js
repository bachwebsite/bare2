self.__uv$config = {
  /**
   * The prefix for UV (Ultraviolet) resources.
   * @type {string}
   */
  prefix: "/uv/service/",

  /**
   * The bare path.
   * @type {string}
   */
  bare: "/bare/",

  /**
   * Function to encode URLs using Ultraviolet's XOR codec.
   * @type {function}
   * @param {string} url - The URL to encode.
   * @returns {string} The encoded URL.
   */
  encodeUrl: Ultraviolet.codec.xor.encode,

  /**
   * Function to decode URLs using Ultraviolet's XOR codec.
   * @type {function}
   * @param {string} url - The URL to decode.
   * @returns {string} The decoded URL.
   */
  decodeUrl: Ultraviolet.codec.xor.decode,

  /**
   * The handler path.
   * @type {string}
   */
  handler: "/uv/uv.handler.js",

  /**
   * The client path.
   * @type {string}
   */
  client: "/uv/uv.client.js",

  /**
   * The bundle path.
   * @type {string}
   */
  bundle: "/uv/uv.bundle.js",

  /**
   * The config path.
   * @type {string}
   */
  config: "/uv/uv.config.js",

  /**
   * The service worker path.
   * @type {string}
   */
  sw: "/uv/uv.sw.js"
};
