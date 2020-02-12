export default class TruliooClient {
  constructor(obj) {
    for (var fld in obj) {
      this[fld] = obj[fld];
    }
    this.embedIDURL = this.embedIDURL
      ? this.embedIDURL
      : "https://embedid.trulioo.com/embedid";
    this.accessTokenURL = this.accessTokenURL
      ? `${this.accessTokenURL}/trulioo-api/embedids/tokens`
      : `${window.location.origin}/trulioo-api/embedids/tokens`;

    try {
      this.registerEvents();
      this.loadEmbedID();
    } catch (error) {
      this.errorHandler(error);
    }
  }

  /**
   * Registers callbacks.
   */
  registerEvents() {
    const truliooClient = this;
    if (window && window.addEventListener) {
      window.addEventListener("message", onMessage, false);
    }

    function onMessage(event) {
      try {
        const eventOriginCompleteURL = `${event && event.origin}/embedid`;
        // Check sender origin to be trusted
        if (truliooClient.embedIDURL !== eventOriginCompleteURL) {
          return;
        }
        var data = event.data;

        if (truliooClient[data.function]) {
          truliooClient[data.function].call(window, JSON.parse(data.message));
        } else {
          console.log(
            `Tried to trigger ${data.func} but found no available callBack`
          );
        }
      } catch (error) {
        this.errorHandler(
          error,
          "Something went wrong during callback registration"
        );
      }
    }
  }

  /**
   * Generates the access token and stores it into this.accessToken variable.
   */
  async injectAccessToken() {
    try {
      const originURL = `${this.accessTokenURL}/${this.publicKey}`;
      const response = await fetch(originURL, {
        method: "POST"
      });
      const deconstructedResult = await response.json();
      const accessToken = deconstructedResult.accessToken;
      this.accessToken = accessToken;
    } catch (error) {
      this.errorHandler(
        error,
        "Something went wrong during access token generation"
      );
    }
  }

  addBasicIframeStyles(iframe) {
    iframe.style.border = "0";
    iframe.style.height = "calc(100vh - 40px)";
    iframe.style.width = "100%";
  }

  loadEmbedID() {
    const element = document.createElement("iframe");
    element.setAttribute("id", "embedid-module");
    this.injectAccessToken()
      .then(() => {
        element.setAttribute(
          "src",
          `${this.embedIDURL}/${this.publicKey}/at/${this.accessToken}`
        );
        const truliooEmbedIDContainer = document.getElementById(
          "trulioo-embedid"
        );
        truliooEmbedIDContainer.appendChild(element);
        const embedIDModule = document.getElementById("embedid-module");
        this.addBasicIframeStyles(embedIDModule);
      })
      .catch(error => this.errorHandler(error));
  }
  errorHandler(error, errorMsg) {
    // replace the div with error component
    const errorMessage =
      errorMsg || "something went wrong during EmbedID form initialization";
    console.error(errorMessage, error);
  }
}
